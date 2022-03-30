import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { createMassiveClientFn } from '@/services/clients'
import { createMassiveWorkerFn } from '@/services/workers'
import { IApps, IClient, IGroupWorker, ILocation, iTimeZone, IWorker } from '@/types/types'
import { FileExcelOutlined } from '@ant-design/icons'
import { Button, List, message, Modal, Tooltip, Upload } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { useContext, useEffect, useState } from 'react'
import readXlsxFile from 'read-excel-file'
import ColumnFactory from '../crudFunctions/columnFactory'
import RenderCheck from '../RenderCheck'
import TableData from '../TableDatas'
const UploadExcel = ({ translations, reload }: { translations: Translations; reload: () => void }) => {
  const [visible, setVisible] = useState(false)

  const [totalClients, setTotalClients] = useState(0)
  const [results, setResults] = useState<{ email: string; success: boolean; reason: any }[]>([])
  const [data, setData] = useState<IClient[]>([])
  const [loading, setLoading] = useState(true)
  const { theme } = useContext(ThemeContext)
  // const [percent, setPercent] = useAsyncState(0)

  const readInput = (value: UploadChangeParam<UploadFile<any>>) => {
    if (!visible) {
      setVisible(true)
    }
    if (value.file.status === 'done') {
      readXlsx(value.file.originFileObj as File)
    }
  }

  const readXlsx = async (file: File) => {
    //Leemos el archivo de excel
    const rows = await readXlsxFile(file)
    //Se verifica que el excel no esta vacio y que haya cargado el excel
    if (rows.length >= 0) {
      //Se recorre rows
      if ((rows[0][0] as string).toLowerCase() !== 'nombre 1') {
        message.error('No coincide el formato')
      }
      const result = []
      for (let k = 1; k < rows.length; k++) {
        if (rows[k][0]) {
          result.push({
            key: k,
            name1: rows[k][0].toString() ? rows[k][0].toString() : '',
            name2: rows[k][1] ? rows[k][1].toString() : '',
            lastname1: rows[k][2] ? rows[k][2].toString() : '',
            lastname2: rows[k][3] ? rows[k][3].toString() : '',
            lastname3: rows[k][4] ? rows[k][4].toString() : '',
            document: rows[k][5] ? rows[k][5].toString() : '',
            phone1: rows[k][6] ? rows[k][6].toString() : '',
            phone2: rows[k][7] ? rows[k][7].toString() : '',
            email: rows[k][8] ? rows[k][8].toString() : '',
            privateAddress: rows[k][9] ? rows[k][9].toString() : '',
            businessAddress: rows[k][10] ? rows[k][10].toString() : '',
            occupation: rows[k][11] ? rows[k][11].toString() : '',
            age: rows[k][12] ? rows[k][12].toString() : '',
            sex: rows[k][13] ? rows[k][13].toString() : '',
            channel: rows[k][14] ? rows[k][14].toString() : '',
            trm: rows[k][15] ? rows[k][15].toString() : '',
            pt: rows[k][16] ? rows[k][16].toString() : '',
            rom: rows[k][17] ? rows[k][17].toString() : '',
            lastVisit: rows[k][18] ? rows[k][18].toString() : '',
            referrals: rows[k][19] ? rows[k][19].toString() : '',
            servicesNotes: rows[k][20] ? rows[k][20].toString() : '',
            productsNotes: rows[k][21] ? rows[k][21].toString() : '',
            medicalNotes: rows[k][22] ? rows[k][22].toString() : '',
            socialMedia: rows[k][23] ? rows[k][23].toString() : '',
            plus: rows[k][24] === 'SI' ? true : false
          })
        }
      }
      setTotalClients(result.length)
      setData(result as any)
    }
    setLoading(false)
  }

  const sendLargeData = async (values: any[], actualResults: []): Promise<any> => {
    if (values.length > 20) {
      const result = (await createMassiveClientFn(values.slice(0, 20))) as any
      return [...actualResults, ...(await sendLargeData(values.slice(20, values.length), result))]
    } else {
      return [...actualResults, ...(await createMassiveClientFn(values))]
    }
  }

  const sendClients = async () => {
    try {
      setResults(await sendLargeData(data, []))
    } catch (error) {
      console.error(error)
      // message.error(error)
    }
  }

  useEffect(() => {
    if (!visible) {
      setData([])
      setTotalClients(0)
      setLoading(true)
    }
  }, [visible])

  useEffect(() => {
    if (results.length > 0) {
      setVisible(false)
      Modal.info({
        title: 'Resultado',
        width: '50vw',
        content: (
          <div>
            <h3>{`Clientes leidos ${totalClients}`}</h3>
            <List
              pagination={{
                pageSize: 3,
                showSizeChanger: false
              }}
              header={<h3>{`Registros exitosos ${results.filter(e => e.success).length}`}</h3>}
              dataSource={results.filter(e => e.success)}
              renderItem={(item, i) => {
                const actual = data.find(e => e.email === item.email) as IClient
                return (
                  <List.Item key={i}>
                    <p>{`${actual.name1} ${actual.lastname1} `}</p>
                  </List.Item>
                )
              }}
            />
            <List
              pagination={{
                pageSize: 3,
                showSizeChanger: false
              }}
              header={<h3>{`Registros Fallidos ${results.filter(e => !e.success).length}`}</h3>}
              dataSource={results.filter(e => !e.success)}
              renderItem={(item, i) => {
                const actual = data.find(e => e.email === item.email) as IClient
                return (
                  <List.Item
                    key={i}
                    actions={[
                      <p>{`${
                        item.reason.code === 11000
                          ? Object.keys(item.reason.keyPattern)[0] === 'email'
                            ? 'Email ya registrado'
                            : 'Documento ya registrado'
                          : 'Error desconocido'
                      }`}</p>
                    ]}
                  >
                    <p>{`${actual.name1} ${actual.lastname1} `}</p>
                  </List.Item>
                )
              }}
            />
          </div>
        ),
        onCancel: () => setResults([]),
        onOk: () => {
          setResults([])
          reload()
        }
      })
    }
  }, [results])

  return (
    <div className="containerDropFile ">
      <Upload listType="text" showUploadList={false} maxCount={1} accept={'.xlsx,.xls,.csv'} name="logo" onChange={readInput}>
        <Tooltip title="Subir excel">
          <Button style={{ margin: '5px' }} shape={'circle'} icon={<FileExcelOutlined />} />
        </Tooltip>
      </Upload>
      <Modal
        destroyOnClose
        maskClosable={false}
        width={'85vw'}
        centered
        onCancel={() => setVisible(false)}
        okButtonProps={{ disabled: !data || data.length === 0 }}
        onOk={sendClients}
        className={`modalCrud${theme} worker_modal`}
        visible={visible}
      >
        <div className="modal_container_worker">
          <h2>{`Clientes leidos ${totalClients}`}</h2>

          <TableData
            scroll={{ x: 1600, y: '40vh' }}
            columns={ColumnFactory({
              columns: [
                {
                  name: 'document',
                  search: true,
                  fixed: 'left',
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'email',
                  search: true,
                  fixed: 'left',
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },

                {
                  name: 'name1',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 100
                },
                {
                  name: 'name2',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 100
                },
                {
                  name: 'lastname1',
                  search: true,

                  customRender: (data: any) => (data ? data : '-'),
                  width: 100
                },
                {
                  name: 'lastname2',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 100
                },
                {
                  name: 'lastname3',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },

                {
                  name: 'phone1',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'phone2',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },

                {
                  name: 'privateAddress',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'businessAddress',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'occupation',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'age',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'sex',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'ranking',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'channel',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'trm',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'pt',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'rom',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'lastVisit',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'referrals',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'servicesNotes',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'productsNotes',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'medicalNotes',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'plus',
                  search: true,
                  customRender: (data: any) => <RenderCheck value={data} />,
                  width: 150
                }
              ],
              translate: translations,
              operations: () => <></>,
              nonShowOperation: true
            })}
            data={data}
            loading={loading}
          />

          {/* <Progress percent={percent} /> */}
        </div>
      </Modal>
    </div>
  )
}

export default React.memo(UploadExcel)
