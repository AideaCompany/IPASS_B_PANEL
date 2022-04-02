import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { IApps } from '@/types/interfaces/Apps/Apps.interface'
import { IGroupWorker } from '@/types/interfaces/GroupWorker/GroupWorker.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { FileExcelOutlined } from '@ant-design/icons'
import { Button, List, message, Modal, Tooltip, Upload } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { useContext, useEffect, useState } from 'react'
import readXlsxFile from 'read-excel-file'
import ColumnFactory from '../crudFunctions/columnFactory'
import TableData from '../TableDatas'

const UploadExcel = ({
  translations,
  reload,
  groups,
  locations,
  timeZone,
  apps
}: {
  translations: ITranslations
  reload: () => void
  groups: IGroupWorker[]
  locations: ILocation[]
  timeZone: ITimeZone[]
  apps: IApps[]
}) => {
  const [visible, setVisible] = useState(false)

  const [totalUser, setTotalUser] = useState(0)
  const [results, setResults] = useState<{ email: string; success: boolean; reason: string }[]>([])
  const [data, setData] = useState<IStaff[]>([])
  const [loading, setLoading] = useState(true)
  const { theme } = useContext(ThemeContext)
  // const [percent, setPercent] = useAsyncState(0)

  const readInput = (value: UploadChangeParam<UploadFile<IStaff>>) => {
    if (!visible) {
      setVisible(true)
    }
    if (value.file.status === 'done') {
      readXlsx(value.file.originFileObj as File)
    }
  }
  const getTypeDocument = (type: string) => {
    switch (type) {
      case 'DPI':
        return 'DPI'
      case 'DE':
        return 'Documento extranjero'
      default:
        return type
    }
  }

  const validateMultiple = (value: string) => {
    if (value.includes(',')) {
      const values = value.split(',')
      return values.map(e => e.trim())
    }
    return [value]
  }

  const readXlsx = async (file: File) => {
    //Leemos el archivo de excel
    const rows = await readXlsxFile(file)
    //Se verifica que el excel no esta vacio y que haya cargado el excel
    if (rows.length >= 0) {
      //Se recorre rows
      if (rows[0][0] !== 'Código') {
        message.error('No coincide el formato')
      }

      const result = []
      for (let k = 0; k < rows.length; k++) {
        if (rows[k][0]) {
          const timeZoneFind = timeZone.filter(g => validateMultiple(rows[k][15] as string).includes(g.abbreviation))
          const groupFind = groups.filter(g => validateMultiple(rows[k][16] as string).includes(g.abbreviation))
          const location = locations.filter(l => validateMultiple(rows[k][17] as string).includes(l.abbreviation))
          const app = apps.filter(a => validateMultiple(rows[k][19] as string).includes(a.abbreviation))
          result.push({
            key: k,
            codeWorker: rows[k][0].toString(),
            name: rows[k][1],
            name1: rows[k][2],
            name2: rows[k][3],
            lastname: rows[k][4],
            lastname1: rows[k][5],
            lastname2: rows[k][6],
            email: rows[k][7].toString(),
            typeDocument: getTypeDocument(rows[k][8] as string),
            document: rows[k][9].toString(),
            phone: rows[k][10].toString(),
            canAccessToApp: rows[k][11] === 'SI' ? true : false,
            canAccessToWeb: rows[k][12] === 'SI' ? true : false,
            rol: rows[k][13],
            code: rows[k][14] === 'SI' ? true : false,
            group: groupFind.length > 0 ? groupFind.map(e => e._id) : [],
            nativeLocation: location.length > 0 ? location.map(e => e._id) : [],
            timeZone: timeZoneFind.length > 0 ? timeZoneFind.map(e => e._id) : [],
            canUseAuthenticator: rows[k][18] === 'SI' ? true : false,
            apps: app.length > 0 ? app.map(e => e._id) : []
          })
        }
      }
      setTotalUser(result.length - 1)
      result.shift()
      setData(result as unknown as IStaff[])
    }
    setLoading(false)
  }

  // const sendLargeData = async (values: unknown[], actualResults: []): Promise<unknown[]> => {
  //   if (values.length > 20) {
  //     const result = (await createMassiveWorkerFn(values.slice(0, 20))) as unknown
  //     return [...actualResults, ...(await sendLargeData(values.slice(20, values.length), result))]
  //   } else {
  //     return [...actualResults, ...(await createMassiveWorkerFn(values))]
  //   }
  // }

  // const sendUsers = async () => {
  //   try {
  //     setResults(await sendLargeData(data, []))
  //   } catch (error) {
  //     console.error(error)
  //     // message.error(error)
  //   }
  // }

  useEffect(() => {
    if (!visible) {
      setData([])
      // setPercent(0)
      setTotalUser(0)
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
            <h3>{`Usuarios leidos ${totalUser}`}</h3>
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
                    <p>{`${actual.name as string} ${actual.lastName} `}</p>
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
                      // eslint-disable-next-line react/jsx-key
                      <p>{`${
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        item.reason.code === 11000
                          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            Object.keys((item.reason as unknown).keyPattern as object)[0] === 'email'
                            ? 'Email ya registrado'
                            : 'Documento ya registrado'
                          : 'Error desconocido'
                      }`}</p>
                    ]}
                  >
                    <p>{`${actual.name as string} ${actual.lastName} `}</p>
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
        width={'80vw'}
        onCancel={() => setVisible(false)}
        okButtonProps={{ disabled: !data || data.length === 0 }}
        onOk={() => {
          console.info('ok')
        }}
        className={`modalCrud${theme} worker_modal`}
        visible={visible}
      >
        <div className="modal_container_worker">
          <h2>{`Usuarios leidos ${totalUser}`}</h2>

          <TableData
            scroll={{ x: 1500, y: '40vh' }}
            columns={ColumnFactory({
              columns: [
                {
                  name: 'codeWorker',
                  search: true,
                  fixed: 'left',
                  width: 100
                },
                {
                  name: 'name',
                  search: true,
                  fixed: 'left',
                  width: 150
                },
                {
                  name: 'name1',
                  search: true,
                  width: 150
                },
                {
                  name: 'name2',
                  search: true,
                  width: 150
                },
                {
                  name: 'lastname',
                  search: true,
                  width: 150
                },
                {
                  name: 'lastname1',
                  search: true,
                  width: 150
                },
                {
                  name: 'lastname2',
                  search: true,
                  width: 150
                },
                {
                  name: 'email',
                  search: true,
                  width: 200
                },
                {
                  name: 'typeDocument',
                  search: true,
                  width: 100
                },
                {
                  name: 'document',
                  search: true,
                  width: 120
                },
                {
                  name: 'phone',
                  search: true,
                  width: 120
                },
                // {
                //   name: 'canAccessToApp',
                //   search: true,
                //   customRender: (render: IStaff) => <RenderCheck value={render} />,
                //   width: 80
                // },
                // {
                //   name: 'canAccessToWeb',
                //   search: true,
                //   customRender: (render: IStaff) => <RenderCheck value={render} />,
                //   width: 80
                // },
                {
                  name: 'rol',
                  search: true,
                  width: 100
                }
                // {
                //   name: 'code',
                //   search: true,
                //   customRender: (render: IStaff) => <RenderCheck value={render} />,
                //   width: 100
                // },
                // {
                //   name: 'timeZone',
                //   search: true,
                //   customRender: (render: IStaff) =>
                //     timeZone
                //       .filter(e => render.includes(e._id))
                //       .map(e => e.abbreviation)
                //       .join(', '),
                //   width: 100
                // },
                // {
                //   name: 'group',
                //   search: true,
                //   //@ts-ignore
                //   customRender: (render: any) =>
                //     groups
                //       .filter(e => render.includes(e._id))
                //       .map(e => e.abbreviation)
                //       .join(', '),
                //   width: 150
                // },
                // {
                //   name: 'apps',
                //   search: true,
                //   //@ts-ignore
                //   customRender: (render: any) => {
                //     apps?.filter(e => render?.includes(e._id))

                //     return apps
                //       ?.filter(e => render?.includes(e._id))
                //       .map(e => e.abbreviation)
                //       .join(', ')
                //   },
                //   width: 150
                // },
                // {
                //   name: 'nativeLocation',
                //   search: true,
                //   //@ts-ignore
                //   customRender: (render: any) => locations.find(e => e._id === render)?.abbreviation,
                //   width: 100
                // },
                // {
                //   name: 'canUseAuthenticator',
                //   search: true,
                //   customRender: (render: any) => <RenderCheck value={render} />,
                //   width: 120
                // }
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
