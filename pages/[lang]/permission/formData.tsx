import React from 'react'
import { Form, Input, Checkbox } from 'antd'
import { Localization } from '../../../i18n/types'
import { Sections } from '../../../types/types'

const FormData = (props: { localization: Localization; section: Sections[] }) => {
  const { localization, section } = props
  const datas = section.map((sec, i) => (
    <div key={i} className="checkboxForms">
      <span key={sec._id}>{sec.name}</span>
      <div key={sec.name} style={{ display: 'flex' }}>
        <Form.Item initialValue={sec._id} name={['permissions', sec._id, 'sectionID']}>
          <Input style={{ display: 'none' }} disabled={true} />
        </Form.Item>
        <Form.Item initialValue={true} valuePropName={'checked'} name={['permissions', sec._id, 'read']}>
          <Checkbox>{localization.translations.read}</Checkbox>
        </Form.Item>
        <Form.Item initialValue={true} valuePropName={'checked'} name={['permissions', sec._id, 'create']}>
          <Checkbox>{localization.translations.create}</Checkbox>
        </Form.Item>
        <Form.Item initialValue={true} valuePropName={'checked'} name={['permissions', sec._id, 'update']}>
          <Checkbox>{localization.translations.update}</Checkbox>
        </Form.Item>
        <Form.Item initialValue={true} valuePropName={'checked'} name={['permissions', sec._id, 'delete']}>
          <Checkbox>{localization.translations.delete}</Checkbox>
        </Form.Item>
      </div>
    </div>
  ))

  return (
    <>
      <Form.Item rules={[{ required: true, message: localization.translations.errorNamePrivilege }]} name="name">
        <Input placeholder={localization.translations.inputName} autoComplete="off" />
      </Form.Item>

      {datas}
    </>
  )
}

export default FormData
