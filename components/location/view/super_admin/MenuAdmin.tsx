import { ThemeContext } from '@/providers/ThemeContext'
import useLocationView from '@/providers/ViewLocationContext'
import { FileSearchOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useContext } from 'react'
const MenuAdmin = ({ current, setCurrent }: { current: string; setCurrent: React.Dispatch<React.SetStateAction<string>> }) => {
  const { translate } = useLocationView()
  const { theme } = useContext(ThemeContext)
  return (
    <Menu theme={theme === '' ? 'light' : 'dark'} onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="info" icon={<FileSearchOutlined />}>
        {translate.locationInfo}
      </Menu.Item>
      <Menu.Item key="admin" icon={<UsergroupAddOutlined />}>
        {translate.selectAdministrator}
      </Menu.Item>
    </Menu>
  )
}

export default React.memo(MenuAdmin)
