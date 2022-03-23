import { ReloadOutlined } from '@ant-design/icons'
import { Button, PageHeader, Tooltip } from 'antd'
import { Translations } from 'i18n/types'
import React from 'react'

const Header = ({
  translation,
  reload,
  create,
  form,
  title,
  hideButtons
}: {
  translation: Translations
  reload?: () => void
  create?: React.ReactNode
  title: string
  form?: boolean
  hideButtons?: boolean
}) => {
  return (
    <PageHeader
      className="site-page-header"
      ghost={false}
      title={title}
      extra={[
        <div style={{ display: 'flex' }} key={1}>
          <span>{form && create}</span>
          <span>
            {!hideButtons && (
              <Tooltip title={translation.reload}>
                <Button style={{ margin: '5px' }} key={2} shape="circle" onClick={reload} icon={<ReloadOutlined />} />
              </Tooltip>
            )}
          </span>
        </div>
      ]}
    />
  )
}

export default React.memo(Header)
