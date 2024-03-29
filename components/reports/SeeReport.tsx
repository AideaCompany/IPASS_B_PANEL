import { ThemeContext } from '@/providers/ThemeContext'
import { ILocationEntries } from '@/types/interfaces/ILocationEntries/LocationEntries.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { EyeOutlined } from '@ant-design/icons'
import { Modal, Tooltip } from 'antd'
import React, { useContext } from 'react'
import { ITranslations } from '../../i18n/types'

import ReportContent from './ReportContent'

const SeeReport = (props: {
  actualPermisions: IPermissionsPrivilege
  translations: ITranslations
  record: ILocationEntries
  afterDelete?: () => void
}): JSX.Element => {
  const { actualPermisions, translations, record } = props
  const { theme } = useContext(ThemeContext)
  const seeModal = (item: ILocationEntries) => {
    Modal.confirm({
      title: `${item.type as string}: `,
      //@ts-ignore
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
