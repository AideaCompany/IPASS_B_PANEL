import React, { useContext } from 'react'
//antd
import { Switch } from 'antd'
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../../providers/ThemeContext'

const ChangeTheme = (): JSX.Element => {
  const { toggleTheme, theme } = useContext(ThemeContext)

  return (
    <div>
      <Switch
        defaultChecked={theme !== ''}
        onChange={() => toggleTheme()}
        checkedChildren={<FontAwesomeIcon icon={faMoon} />}
        unCheckedChildren={<FontAwesomeIcon icon={faSun} />}
      />
    </div>
  )
}

export default ChangeTheme
