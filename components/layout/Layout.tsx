import useAuth from '@/providers/AuthContext'
import { LanguageContext } from '@/providers/LenguageContext'
//provider
import { ThemeContext } from '@/providers/ThemeContext'
import { LayoutProps } from '@/types/types'
import {
  AuditOutlined,
  BarChartOutlined,
  BarcodeOutlined,
  CalendarOutlined,
  CodeOutlined,
  DesktopOutlined,
  FieldTimeOutlined,
  LaptopOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  PlusOutlined,
  ShoppingOutlined,
  TagsOutlined,
  UserOutlined,
  WarningOutlined
} from '@ant-design/icons'
import { Button, Layout, Menu, Tooltip } from 'antd'
import { Building, CategoryIcon, HouseIcon, Raspberry, Worker } from 'icons/personalIcons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
//components
import Main from '../main'
import ChangeTheme from './ChangeTheme'
import Header from './Header'
import LocaleSwitcher from './LocaleSwitcher'
import UserMenu from './UserMenu'

const { Content, Sider } = Layout

type layoutObj = {
  path: string
  title: string
  icon: JSX.Element
}
const MainLayout = (props: LayoutProps) => {
  //props
  const { children, title, lang, getData, create, hideButtons, notShowHeader, layoutMargin = { margin: '40px 16px' } } = props
  const router = useRouter()
  //provider
  const { toggleCollapsed, collapsed, theme } = useContext(ThemeContext)
  const { localization } = useContext(LanguageContext)

  const { permission, section } = useAuth()
  const [selectOption, setSelectOption] = useState<string[]>(['1'])
  //const
  const layoutObj: layoutObj[] = [
    {
      path: '/dashboard',
      title: localization.translations.cms,
      icon: <DesktopOutlined />
    },
    {
      path: '/clients',
      title: localization.translations.clients,
      icon: <DesktopOutlined />
    },
    {
      path: '/reports',
      title: localization.translations.reports,
      icon: <BarChartOutlined />
    },
    {
      path: '/risk',
      title: localization.translations.risk,
      icon: <WarningOutlined />
    },
    {
      path: '/board',
      title: localization.translations.board,
      icon: <PieChartOutlined />
    },
    {
      path: '/masterLocation',
      title: localization.translations.masterLocation,
      icon: <Building />
    },
    {
      path: '/location',
      title: localization.translations.location,
      icon: <Raspberry />
    },

    {
      path: '/event',
      title: localization.translations.event,
      icon: <CalendarOutlined />
    },
    {
      path: '/eventExpress',
      title: localization.translations.eventExpress,
      icon: <CalendarOutlined />
    },
    {
      path: '/contact',
      title: localization.translations.contact,
      icon: <AuditOutlined />
    },
    {
      path: '/visitorCategory',
      title: localization.translations.visitorCategory,
      icon: <CategoryIcon />
    },
    {
      path: '/visitorBrand',
      title: localization.translations.visitorBrand,
      icon: <BarcodeOutlined />
    },
    {
      path: '/visitorPlace',
      title: localization.translations.visitorPlace,
      icon: <HouseIcon />
    },
    {
      path: '/device',
      title: localization.translations.device,
      icon: <LaptopOutlined />
    },
    {
      path: '/apps',
      title: localization.translations.apps,
      icon: <CodeOutlined />
    },
    {
      path: '/authenticator',
      title: localization.translations.authenticator,
      icon: <OrderedListOutlined />
    },
    {
      path: '/timeZone',
      title: localization.translations.timeZone,
      icon: <FieldTimeOutlined />
    },
    {
      path: '/worker',
      title: localization.translations.worker,
      icon: <Worker />
    },
    {
      path: '/products',
      title: localization.translations.products,
      icon: <ShoppingOutlined />
    },
    {
      path: '/serviceTypes',
      title: localization.translations.serviceTypes,
      icon: <TagsOutlined />
    },
    {
      path: '/users',
      title: localization.translations.user,
      icon: <UserOutlined />
    }
  ]
  //effect
  useEffect(() => {
    if (section) {
      layoutObj.map((e, i) => {
        if (router.asPath.replace(`/${router.query.lang}/`, '/').includes(e.path)) {
          setSelectOption([(i + 1).toString()])
        }
      })
    }
  }, [section])
  //Functions
  const onCollapse = () => {
    toggleCollapsed()
  }

  return (
    <Main title={title}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme={theme === '' ? 'light' : 'dark'}
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div className="logo">{collapsed ? <img src="/logoipasscompact.png" alt="" /> : <img src="/logoipass.svg" alt="" />}</div>
          <Menu
            className="menu_left_layout"
            defaultOpenKeys={['0']}
            selectedKeys={selectOption}
            theme={theme === '' ? 'light' : 'dark'}
            mode="inline"
          >
            {layoutObj.map((e, i) => {
              const actual = permission.permissions?.find(l => `/${l.sectionName?.toLocaleLowerCase()}` === e.path.toLocaleLowerCase())
              if (actual?.read || e.path === '/dashboard' || e.path === '/config') {
                return (
                  <Menu.Item key={(i + 1).toString()} icon={e.icon}>
                    <Link href={`/${router.query.lang}${e.path}`}>{e.title ? e.title : 'Sin traduccion'}</Link>
                  </Menu.Item>
                )
              }
            })}
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Layout.Header className="site-layout-background headerLayout" style={{ padding: 0 }}>
            <div>
              <ChangeTheme />
              <LocaleSwitcher />
              <UserMenu />
            </div>
          </Layout.Header>
          <Content style={layoutMargin}>
            <div className="site-layout-background containerLayout" style={{ padding: '24px' }}>
              {!notShowHeader && (
                <Header
                  hideButtons={hideButtons}
                  create={
                    !hideButtons &&
                    (create ? (
                      create
                    ) : (
                      <Tooltip title={localization.translations.titleModalCreate}>
                        <Link href={{ pathname: '/[lang]/evaluation_design/create', query: { lang } }}>
                          <Button style={{ margin: '5px' }} shape="circle" icon={<PlusOutlined />} />
                        </Link>
                      </Tooltip>
                    ))
                  }
                  form
                  translation={localization.translations}
                  reload={getData}
                  title={title}
                />
              )}
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Main>
  )
}

export default React.memo(MainLayout)
