import { IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { CoffeeOutlined, EditOutlined } from '@ant-design/icons'
import { Localization } from 'i18n/types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { layoutObj } from './Layout'
import ModalConfig from './ModalConfig'

const Index = ({ localization, permissions }: { localization: Localization; permissions: IPrivilege }) => {
  const router = useRouter()

  const items: layoutObj[] = [
    {
      path: '/aerolineas',
      title: 'test',
      icon: <EditOutlined />
    }
  ]
  const [visible, setVisible] = useState(false)
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

      <div onClick={() => router.push({ pathname: '/[lang]/occupation', query: { lang: router.query.lang } })} className="itemConfig">
        <div className="subItem">
          <div className="icon">
            <CoffeeOutlined />
          </div>
          <div className="text">
            <span>Ocupaciones</span>
          </div>
        </div>
      </div>
      <div onClick={() => setVisible(true)} className="itemConfig">
        <div className="subItem">
          <ModalConfig visible={visible} setVisible={setVisible} />
          <div className="text">
            <span>Configuración</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Index)
