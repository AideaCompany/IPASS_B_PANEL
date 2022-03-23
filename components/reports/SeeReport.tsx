import { ThemeContext } from '@/providers/ThemeContext'
import { EyeOutlined } from '@ant-design/icons'
import { Modal, Tooltip } from 'antd'
import React, { useContext } from 'react'
import { Translations } from '../../i18n/types'
import { PermissionsPrivilege } from '../../types/types'
import ReportContent from './ReportContent'

const SeeReport = (props: {
  actualPermisions: PermissionsPrivilege
  translations: Translations
  record: any
  afterDelete?: () => void
}): JSX.Element => {
  const { actualPermisions, translations, record } = props
  const { theme } = useContext(ThemeContext)
  const seeModal = (item: any) => {
    Modal.confirm({
      title: `${item.type}: ${item.name}`,
      content: <ReportContent element={item} />,
      className: `modalCrud${theme}`,
      cancelButtonProps: { style: { display: 'none' } },
      centered: true,
      maskClosable: true,
      okCancel: true
    })
  }

  return (
    <>
      {actualPermisions?.delete && (
        <Tooltip placement="top" title={translations.view}>
          <a>
            <EyeOutlined style={{ paddingLeft: '5px' }} onClick={() => seeModal(record)} />
          </a>
        </Tooltip>
      )}
    </>
  )
}

export default React.memo(SeeReport)
