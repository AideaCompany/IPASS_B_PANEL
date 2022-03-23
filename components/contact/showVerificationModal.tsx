import { IContact } from '@/types/types'
import { Tooltip } from 'antd'
import { Shield } from 'icons/personalIcons'
import React, { useState } from 'react'
import { Translations } from '../../i18n/types'
import ContactVerifiedModal from './ContactVerifiedModal'

const showVerificationModa = (props: { translations: Translations; record: IContact }): JSX.Element => {
  const { record } = props
  const [visible, setvisible] = useState<boolean>(false)

  return (
    <>
      {record?.verified ? (
        <Tooltip placement="top" title={'Ver usuario verificado'}>
          <a>
            <Shield style={{ color: 'green', paddingLeft: '5px' }} onClick={() => setvisible(true)} />
          </a>
        </Tooltip>
      ) : (
        record && (
          <Tooltip placement="top" title={'Autenticar usuario'}>
            <a>
              <img src={'/parpadeo.gif'} style={{ height: '15px' }} onClick={() => setvisible(true)} />
            </a>
          </Tooltip>
        )
      )}
      <ContactVerifiedModal record={record} visible={visible} setvisible={setvisible} />
    </>
  )
}

export default React.memo(showVerificationModa)
