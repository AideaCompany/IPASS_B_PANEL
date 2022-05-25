import { DownOutlined, PoweroffOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
//context
import useAuth from '../../providers/AuthContext'
import { ThemeContext } from '../../providers/ThemeContext'
const UserMenu = () => {
  const { theme } = useContext(ThemeContext)
  const { user, logout } = useAuth()
  const [username, setusername] = useState<string>('')
  const [userPicture] = useState<string>('')
  useEffect(() => {
    if (user) {
      setusername(`${user.name as string} ${user.lastName as string}`)
    }
  }, [user])

  const menu = (
    <Menu className={`dropDown${theme}`}>
      {/* <Menu.Item>
        <Link href="/perfil">
          <a>
            <UserOutlined style={{ marginRight: 8 }} /> Perfil
          </a>
        </Link>
      </Menu.Item> */}
      <Menu.Item>
        <a onClick={logout}>
          <PoweroffOutlined style={{ marginRight: 8 }} /> Cerrar Sesión
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="userMenu">
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {userPicture ? <Avatar src={userPicture} /> : <UserOutlined style={{ color: theme === '-dark' ? 'white' : 'black' }} />}
          <span className="nameUser">
            <span>{username}</span> <DownOutlined style={{ color: theme === '-dark' ? 'white' : 'black' }} />
          </span>
        </a>
      </Dropdown>
    </div>
  )
}
export default React.memo(UserMenu)
