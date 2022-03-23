import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { locales } from '../../i18n/config'
import useTranslation from '../../hooks/useTranslations'
//Antd
import { Select } from 'antd'
import { valueType } from 'antd/lib/statistic/utils'
import { ThemeContext } from '../../providers/ThemeContext'

const LocaleSwitcher = (): JSX.Element => {
  //Providers
  const router = useRouter()
  const { theme } = useContext(ThemeContext)

  const handleLocaleChange = React.useCallback(
    (e: valueType) => {
      router.push({ pathname: router.pathname, query: { ...router.query, lang: e } })
    },
    [router]
  )

  const { locale } = useTranslation()

  return (
    <div>
      <Select dropdownClassName={`dropDown${theme}`} onChange={handleLocaleChange} defaultValue={locale}>
        {locales.map((el, i) => (
          <Select.Option key={i} value={el}>
            {el.toUpperCase()}
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}

export default LocaleSwitcher
