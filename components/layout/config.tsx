import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { CloudDownloadOutlined, EditOutlined } from '@ant-design/icons'
import { List, Modal } from 'antd'
import { Localization } from 'i18n/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { layoutObj } from './Layout'

const dataList = [
  {
    title: 'Plantilla de carga',
    link: `${process.env.NEXT_PUBLIC_BACK_FILES}/plantilla-carga`
  }
]

const Index = ({ localization, permissions }: { localization: Localization; permissions: IPrivilege }) => {
  const router = useRouter()

  const items: layoutObj[] = [
    {
      path: '/aerolineas',
      title: 'test',
      icon: <EditOutlined />
    }
  ]

  const openDescargables = () => {
    Modal.info({
      title: 'Descargables',
      okCancel: true,
      centered: true,
      content: (
        <List
          dataSource={dataList}
          renderItem={item => (
            <List.Item>
              <a href={item?.link} target="_blank" rel="noopener noreferrer">
                {item?.title}
              </a>
            </List.Item>
          )}
        />
      )
    })
  }

  return (
    <div className="containerConfig">
      {items.map((item, i) => {
        const actual = permissions.permissions?.find(l => `/${l.sectionName?.toLocaleLowerCase()}` === item.path.toLocaleLowerCase())
        if (actual?.read) {
          return (
            <div key={i} className="itemConfig">
              <Link href={`/${router.query.lang}${item.path}`}>
                <div className="subItem">
                  <div className="icon">{item.icon}</div>
                  <div className="text">
                    <span>{item?.title}</span>
                  </div>
                </div>
              </Link>
            </div>
          )
        }
      })}
      <div onClick={openDescargables} className="itemConfig">
        <div className="subItem">
          <div className="icon">
            <CloudDownloadOutlined />
          </div>
          <div className="text">
            <span>Descargables</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Index)
