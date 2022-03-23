import useSecurity from '@/providers/SecurityContext'
import React from 'react'
import ContactVerifiedModal from '../contact/ContactVerifiedModal'

const ModalContact = (): JSX.Element => {
  const { showContact, setShowContact, contactData } = useSecurity()
  return (
    <>
      <ContactVerifiedModal showVerify={false} record={contactData} visible={showContact} setvisible={setShowContact} />
    </>
  )
}

export default React.memo(ModalContact)
