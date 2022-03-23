import { Translations } from '@/i18n/types'
import useSecurity from '@/providers/SecurityContext'
import { IContact, IEvent, IEventExpress, ILocation, ILocationEntries } from '@/types/types'
import { typeQr } from '@/types/valuesAddQr'
import { getDpi, getHost, getLastName, getName, getType } from '@/utils/report'
import { CalendarOutlined, UserOutlined } from '@ant-design/icons'
import { Table, Tooltip } from 'antd'
import moment from 'moment-timezone'
import React, { useState } from 'react'
import ColumnFactory from '../crudFunctions/columnFactory'

const ListViews = ({ translate }: { translate: Translations }) => {
  const { setContactData, setShowContact, setEventData, setShowEvent, entries } = useSecurity()
  // @ts-ignore
  const [searchedWord, setSearchedWord] = useState<string>('')
  console.log(entries)
  const values = entries.map((e, i) => ({
    ...e,
    key: i,
    type: getType(e.typeQr),
    date: e.createdAt,
    host: getHost(e),
    name: getName(e),
    lastname: getLastName(e),
    in: e.hourIn,
    out: e.hourOut,
    location: e.location,
    dpi: getDpi(e)
  }))
  const toSeeContact = (data: IContact) => {
    setContactData(data)
    setShowContact(true)
  }

  const showEvent = (event: IEvent | IEventExpress) => {
    setEventData(event)
    setShowEvent(true)
  }

  return (
    <div className="listView">
      {/* <div className="filters">
   
        <div className="inputTextFilter">
          <Input.Search allowClear value={searchedWord} onChange={e => setSearchedWord(e.target.value)} />
        </div>
      </div> */}
      <Table
        dataSource={values}
        rowClassName="rowTable"
        sticky={true}
        pagination={{ pageSize: 6 }}
        // scroll={{ y: '65vh' }}
        columns={ColumnFactory({
          columns: [
            {
              name: 'type',
              customRender: (render: typeQr) => render,
              search: true
            },
            {
              name: 'date',
              customRender: (render: ILocationEntries) => <>{moment.tz(render.createdAt, 'America/Guatemala').format('YYYY-MM-DD')}</>
            },
            {
              name: 'in',
              customRender: (render: ILocationEntries) =>
                render.hourIn ? moment.tz(render.hourIn, 'America/Guatemala').format('YYYY-MM-DD, hh:mm:ss a') : <>-</>
            },
            {
              name: 'out',
              customRender: (render: ILocationEntries) =>
                render.hourOut ? moment.tz(render.hourOut, 'America/Guatemala').format('YYYY-MM-DD, hh:mm:ss a') : <>-</>
            },
            {
              name: 'host',
              customRender: (render: ILocationEntries) => render.host
            },
            {
              name: 'location',
              customRender: (render: ILocationEntries) => (render?.location as ILocation)?.name
            },
            {
              name: 'name',
              customRender: (render: string) => render,
              search: true
            },
            {
              name: 'lastname',
              customRender: (render: string) => render,
              search: true
            },
            {
              name: 'dpi',
              customRender: (render: string) => render,
              search: true
            },
            {
              name: 'seeMore',
              customRender: (render: ILocationEntries) => {
                const toReturn = []
                if ([typeQr.event, typeQr.eventExpress].includes(render.typeQr)) {
                  toReturn.push(
                    <>
                      <Tooltip title={'Ver evento'}>
                        <CalendarOutlined
                          onClick={() =>
                            showEvent(typeQr.event === render.typeQr ? (render.event as IEvent) : (render.eventExpress as IEventExpress))
                          }
                        />
                      </Tooltip>
                      <Tooltip title={'Ver usuario'}>
                        <UserOutlined style={{ marginLeft: '5px' }} onClick={() => toSeeContact(render.contact as IContact)} />
                      </Tooltip>
                    </>
                  )
                }
                // if ([typeQr.worker, typeQr.worker_temporal].includes(render.typeQr)) {
                //   toReturn.push(
                //     <>
                //       <Tooltip title={'Ver usuario'}>
                //         <UserOutlined
                //           style={{ marginLeft: '5px' }}
                //           onClick={() =>
                //             toSeeContact({
                //               verified: false,
                //               firstName: (render.worker as IWorker).name,
                //               lastName: (render.worker as IWorker).lastname,
                //               email: (render.worker as IWorker).email
                //             } as IContact)
                //           }
                //         />
                //       </Tooltip>
                //     </>
                //   )
                // }
                // if ([typeQr.user_temporal].includes(render.typeQr)) {
                //   toReturn.push(
                //     <>
                //       <Tooltip title={'Ver usuario'}>
                //         <UserOutlined
                //           style={{ marginLeft: '5px' }}
                //           onClick={() =>
                //             toSeeContact({
                //               verified: false,
                //               firstName: (render.user as User).name,
                //               lastName: (render.user as User).lastname,
                //               email: (render.user as User).email
                //             } as IContact)
                //           }
                //         />
                //       </Tooltip>
                //     </>
                //   )
                // }
                return <>{toReturn.map(e => e)}</>
              }
            }
          ],
          translate: translate,
          operations: () => <></>,
          nonShowOperation: true
        })}
      />
    </div>
  )
}

export default ListViews
