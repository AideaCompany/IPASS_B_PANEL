<<<<<<< HEAD
import { Translations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { createMassiveWorkerFn } from '@/services/workers'
import { IApps, IGroupWorker, ILocation, iTimeZone, IWorker } from '@/types/types'
=======
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { createMassiveClientFn } from '@/services/clients'
import { IClient } from '@/types/interfaces/Clients/client.interface'
>>>>>>> dev
import { FileExcelOutlined } from '@ant-design/icons'
import { Button, List, message, Modal, Tooltip, Upload } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { useContext, useEffect, useState } from 'react'
import readXlsxFile from 'read-excel-file'
import ColumnFactory from '../crudFunctions/columnFactory'
import RenderCheck from '../RenderCheck'
import TableData from '../TableDatas'
<<<<<<< HEAD
const UploadExcel = ({ translations, reload }: { translations: Translations; reload: () => void }) => {
  const [visible, setVisible] = useState(false)

  const [totalClients, setTotalClients] = useState(0)
  const [results, setResults] = useState<{ email: string; success: boolean; reason: any }[]>([])
  const [data, setData] = useState<any[]>([])
=======
const UploadExcel = ({ translations, reload }: { translations: ITranslations; reload: () => void }) => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)

  const [totalClients, setTotalClients] = useState(0)
  const [results, setResults] = useState<{ email: string; success: boolean; reason: any }[]>([])
  const [data, setData] = useState<IClient[]>([])
>>>>>>> dev
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

<<<<<<< HEAD
  // const validateMultiple = (value: string) => {
  //   if (value.includes(',')) {
  //     const values = value.split(',')
  //     return values.map(e => e.trim())
  //   }
  //   return [value]
  // }

=======
>>>>>>> dev
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
<<<<<<< HEAD
            lastname1: rows[k][2] ? rows[k][2].toString() : '',
            lastname2: rows[k][3] ? rows[k][3].toString() : '',
            lastname3: rows[k][4] ? rows[k][4].toString() : '',
=======
            lastName1: rows[k][2] ? rows[k][2].toString() : '',
            lastName2: rows[k][3] ? rows[k][3].toString() : '',
            lastName3: rows[k][4] ? rows[k][4].toString() : '',
>>>>>>> dev
            document: rows[k][5] ? rows[k][5].toString() : '',
            phone1: rows[k][6] ? rows[k][6].toString() : '',
            phone2: rows[k][7] ? rows[k][7].toString() : '',
            email: rows[k][8] ? rows[k][8].toString() : '',
            privateAddress: rows[k][9] ? rows[k][9].toString() : '',
            businessAddress: rows[k][10] ? rows[k][10].toString() : '',
            occupation: rows[k][11] ? rows[k][11].toString() : '',
            age: rows[k][12] ? rows[k][12].toString() : '',
            sex: rows[k][13] ? rows[k][13].toString() : '',
<<<<<<< HEAD
            ranking: rows[k][14] ? rows[k][14] : '',
            channel: rows[k][15] ? rows[k][15].toString() : '',
            trm: rows[k][16] ? rows[k][16].toString() : '',
            pt: rows[k][17] ? rows[k][17].toString() : '',
            rom: rows[k][18] ? rows[k][18].toString() : '',
            lastVisit: rows[k][19] ? rows[k][19].toString() : '',
            referrals: rows[k][20] ? rows[k][20].toString() : '',
            servicesNotes: rows[k][21] ? rows[k][21].toString() : '',
            productsNotes: rows[k][22] ? rows[k][22].toString() : '',
            medicalNotes: rows[k][23] ? rows[k][23].toString() : '',
            socialMedia: rows[k][24] ? rows[k][24].toString() : ''
=======
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
            plus: rows[k][24] === 'SI' ? true : false,
            country: rows[k][25] ? rows[k][25].toString() : ''
>>>>>>> dev
          })
        }
      }
      setTotalClients(result.length)
<<<<<<< HEAD
      setData(result)
=======
      setData(result as any)
>>>>>>> dev
    }
    setLoading(false)
  }

  const sendLargeData = async (values: any[], actualResults: []): Promise<any> => {
<<<<<<< HEAD
    console.log(values)
    // if (values.length > 20) {
    //   const result = (await createMassiveClientFn(values.slice(0, 20))) as any
    //   return [...actualResults, ...(await sendLargeData(values.slice(20, values.length), result))]
    // } else {
    //   return [...actualResults, ...(await createMassiveClientFn(values))]
    // }
=======
    if (values.length > 20) {
      const result = (await createMassiveClientFn(values.slice(0, 20))) as any
      return [...actualResults, ...(await sendLargeData(values.slice(20, values.length), result))]
    } else {
      return [...actualResults, ...(await createMassiveClientFn(values))]
    }
>>>>>>> dev
  }

  const sendClients = async () => {
    try {
<<<<<<< HEAD
      await sendLargeData(data, [])
      // setResults(await sendLargeData(data, []))
=======
      setResults(await sendLargeData(data, []))
>>>>>>> dev
    } catch (error) {
      console.error(error)
      // message.error(error)
    }
  }

  useEffect(() => {
    if (!visible) {
      setData([])
<<<<<<< HEAD
      // setPercent(0)
=======
>>>>>>> dev
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
<<<<<<< HEAD
                const actual = data.find(e => e.email === item.email) as IWorker
                return (
                  <List.Item key={i}>
                    <p>{`${actual.name} ${actual.lastname} `}</p>
=======
                const actual = data.find(e => e.email === item.email) as IClient
                return (
                  <List.Item key={i}>
                    <p>{`${actual.name1} ${actual.lastName1} `}</p>
>>>>>>> dev
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
<<<<<<< HEAD
                const actual = data.find(e => e.email === item.email) as IWorker
=======
                const actual = data.find(e => e.email === item.email) as IClient
>>>>>>> dev
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
<<<<<<< HEAD
                    <p>{`${actual.name} ${actual.lastname} `}</p>
=======
                    <p>{`${actual.name1} ${actual.lastName1} `}</p>
>>>>>>> dev
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

<<<<<<< HEAD
  return (
    <div className="containerDropFile ">
      <Upload listType="text" showUploadList={false} maxCount={1} accept={'.xlsx,.xls,.csv'} name="logo" onChange={readInput}>
        <Tooltip title="Subir excel">
          <Button style={{ margin: '5px' }} shape={'circle'} icon={<FileExcelOutlined />} />
        </Tooltip>
      </Upload>
=======
  const downloadTemplate = () => {
    let a = document.createElement('a')
    a.style.display = 'none'
    a.href = `/plantillaClientes.xlsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="containerDropFile ">
      <Tooltip title="Excel">
        <Button style={{ margin: '5px' }} shape={'circle'} icon={<FileExcelOutlined />} onClick={() => setVisible2(true)} />
      </Tooltip>
      <Modal
        destroyOnClose
        maskClosable={false}
        centered
        onCancel={() => setVisible2(false)}
        footer={null}
        onOk={() => console.log('ok')}
        className={`modalCrud${theme} worker_modal`}
        visible={visible2}
      >
        <div className="modalCrud_header">
          <h2>¿Qué deseas realizar?</h2>
          <p style={{ fontStyle: 'italic' }}>Nota: Para subir información desde Excel es necesario usar la plantilla.</p>
          <div className="flex" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Upload
              className="uploadAntd"
              style={{ width: '100%' }}
              listType="text"
              showUploadList={false}
              maxCount={1}
              accept={'.xlsx,.xls,.csv'}
              name="logo"
              onChange={readInput}
            >
              <Button shape={'round'} style={{ width: '100%', marginBottom: '1em' }} type={'primary'}>
                Subir Excel
              </Button>
            </Upload>
            <Button shape={'round'} style={{ width: '100%', marginBottom: '1em' }} onClick={downloadTemplate}>
              Descargar Plantilla
            </Button>
          </div>
        </div>
      </Modal>
>>>>>>> dev
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
<<<<<<< HEAD
                  name: 'lastname1',
=======
                  name: 'lastName1',
>>>>>>> dev
                  search: true,

                  customRender: (data: any) => (data ? data : '-'),
                  width: 100
                },
                {
<<<<<<< HEAD
                  name: 'lastname2',
=======
                  name: 'lastName2',
>>>>>>> dev
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 100
                },
                {
<<<<<<< HEAD
                  name: 'lastname3',
=======
                  name: 'lastName3',
>>>>>>> dev
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
<<<<<<< HEAD
=======
                },
                {
                  name: 'plus',
                  search: true,
                  customRender: (data: any) => <RenderCheck value={data} />,
                  width: 150
                },
                {
                  name: 'country',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
>>>>>>> dev
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
