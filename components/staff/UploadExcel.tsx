import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { createMassiveStaffFn } from '@/services/staff'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { FileExcelOutlined } from '@ant-design/icons'
import { Button, List, message, Modal, Tooltip, Upload } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { useContext, useEffect, useState } from 'react'
import readXlsxFile from 'read-excel-file'
import ColumnFactory from '../crudFunctions/columnFactory'
import RenderCheck from '../RenderCheck'
import TableData from '../TableDatas'
const UploadExcel = ({ translations, reload }: { translations: ITranslations; reload: () => void }) => {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)

  const [totalStaffers, setTotalStaffers] = useState(0)
  const [results, setResults] = useState<{ email: string; success: boolean; reason: any }[]>([])
  const [data, setData] = useState<IStaff[]>([])
  const [loading, setLoading] = useState(true)
  const { theme } = useContext(ThemeContext)
  // const [percent, setPercent] = useAsyncState(0)

  const readInput = (value: UploadChangeParam<UploadFile<any>>) => {
    if (!visible) {
      setVisible(true)
    }
    if (value.file.status === 'done') {
      console.log('aqui')
      readXlsx(value.file.originFileObj as File)
    }
  }

  const readXlsx = async (file: File) => {
    //Leemos el archivo de excel
    const rows = await readXlsxFile(file)
    //Se verifica que el excel no esta vacio y que haya cargado el excel
    if (rows.length >= 0) {
      //Se recorre rows
      if ((rows[0][0] as string).toLowerCase() !== 'nombre') {
        message.error('No coincide el formato')
      }
      const result = []
      for (let k = 1; k < rows.length; k++) {
        if (rows[k][0]) {
          result.push({
            key: k,
            name: rows[k][0]?.toString() ? rows[k][0]?.toString() : '',
            lastName: rows[k][1]?.toString() ? rows[k][1]?.toString() : '',
            email: rows[k][2]?.toString() ? rows[k][2]?.toString() : '',
            name1: rows[k][3]?.toString() ? rows[k][3]?.toString() : '',
            name2: rows[k][4]?.toString() ? rows[k][4]?.toString() : '',
            lastName1: rows[k][5]?.toString() ? rows[k][5]?.toString() : '',
            lastName2: rows[k][6]?.toString() ? rows[k][6]?.toString() : '',
            address: rows[k][7]?.toString() ? rows[k][7]?.toString() : '',
            phone: rows[k][8]?.toString() ? rows[k][8]?.toString() : '',
            phone1: rows[k][9]?.toString() ? rows[k][9]?.toString() : '',
            specialty: rows[k][10]?.toString() ? rows[k][10]?.toString() : '',
            AET: rows[k][11]?.toString() ? rows[k][11]?.toString() : '',
            canAccessToApp: rows[k][12] === 'SI' ? true : false,
            canAccessToWeb: rows[k][13] === 'SI' ? true : false,
            plus: rows[k][14] === 'SI' ? true : false,
            stores: rows[k][15]?.toString() ? rows[k][15]?.toString() : ''
          })
        }
      }
      setTotalStaffers(result.length)
      setData(result as any)
    }
    setLoading(false)
  }

  const sendLargeData = async (values: IStaff[], actualResults: []): Promise<any> => {
    if (values.length > 20) {
      const result = (await createMassiveStaffFn(values.slice(0, 20))) as any
      return [...actualResults, ...(await sendLargeData(values.slice(20, values.length), result))]
    } else {
      return [...actualResults, ...(await createMassiveStaffFn(values))]
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
      setTotalStaffers(0)
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
            <h3>{`Staffers leidos ${totalStaffers}`}</h3>
            <List
              pagination={{
                pageSize: 3,
                showSizeChanger: false
              }}
              header={<h3>{`Registros exitosos ${results.filter(e => e.success).length}`}</h3>}
              dataSource={results.filter(e => e.success)}
              renderItem={(item, i) => {
                const actual = data.find(e => e.email === item.email) as IStaff
                return (
                  <List.Item key={i}>
                    <p>{`${actual.name1} ${actual.lastName1} `}</p>
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
                const actual = data.find(e => e.email === item.email) as IStaff
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
                    <p>{`${actual.name1} ${actual.lastName1} `}</p>
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

  const downloadTemplate = () => {
    let a = document.createElement('a')
    a.style.display = 'none'
    a.href = `/plantillaStaffers.xlsx`
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
          <h2>{`Staffers leidos ${totalStaffers}`}</h2>

          <TableData
            scroll={{ x: 1600, y: '40vh' }}
            columns={ColumnFactory({
              columns: [
                {
                  name: 'name',
                  search: true,
                  fixed: 'left',
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },

                {
                  name: 'lastName',
                  search: true,
                  fixed: 'left',
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'email',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 100
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
                  name: 'lastName1',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },

                {
                  name: 'lastName2',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'address',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },

                {
                  name: 'phone',
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
                  name: 'specialty',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'AET',
                  search: true,
                  customRender: (data: any) => (data ? data : '-'),
                  width: 150
                },
                {
                  name: 'canAccessToApp',
                  search: true,
                  customRender: (data: any) => <RenderCheck value={data} />,
                  width: 150
                },
                {
                  name: 'canAccessToWeb',
                  search: true,
                  customRender: (data: any) => <RenderCheck value={data} />,
                  width: 150
                },
                {
                  name: 'plus',
                  search: true,
                  customRender: (data: any) => <RenderCheck value={data} />,
                  width: 150
                },
                {
                  name: 'stores',
                  search: true,

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
