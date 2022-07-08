import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { ITimeZone } from '@/types/interfaces/TimeZone/TimeZone.interface'
import { FormFactory as FormFactoryType } from '@/types/typeTemplate'
import { Form, Select } from 'antd'
import { useContext, useState } from 'react'
import FormFactory from '../../../crudFunctions/FormFactory'

import guatemala from '../../guatemala.json'
import lodash from 'lodash'
import { FormElements } from './formElementsGeneral'
const FormGeneralInfo = (props: { translate: ITranslations; isUpdate?: boolean; timeZone: ITimeZone[] }): JSX.Element => {
  const { translate, isUpdate, timeZone } = props
  const updating = isUpdate ? true : false
  const { theme } = useContext(ThemeContext)
  const [department, setDepartment] = useState('')
  const [city, setCity] = useState('')
  const MySelect = ({
    element,
    value,
    onChange,
    disabled = false
  }: {
    value: string
    onChange: (value: string) => void
    element: FormFactoryType.IFormFactoryType<any>
    disabled?: boolean
  }) => {
    return (
      <div className={element.fullWidth ? 'fullWidth' : ''}>
        <h3>{translate[typeof element.name === 'object' ? element.name[1] : element.name]}:</h3>
        <Form.Item name={element.name}>
          <Select
            value={value}
            onChange={onChange}
            allowClear
            showSearch
            disabled={disabled}
            placeholder={translate[element.name]}
            //@ts-ignore
            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              //@ts-ignore
              element.data?.map((c: { name: string; _id: string } | string) => {
                //@ts-ignore
                if (Object.keys(c).findIndex(e => e === '_id') !== -1) {
                  return (
                    //@ts-ignore
                    <Select.Option key={c._id} value={c._id}>
                      {(c as { name: string }).name}
                    </Select.Option>
                  )
                } else {
                  return (
                    <Select.Option key={c as string} value={c as string}>
                      {c}
                    </Select.Option>
                  )
                }
              })
            }
          </Select>
        </Form.Item>
      </div>
    )
  }

  return (
    <>
      <div className="formContainer">
        <MySelect
          value={department}
          onChange={value => {
            setCity('')
            setDepartment(value)
          }}
          element={{
            name: 'department',
            data: lodash.uniq(guatemala.map(e => e.admin_name)),
            type: 'select'
          }}
        />
        <MySelect
          value={city}
          onChange={value => setCity(value)}
          disabled={department === ''}
          element={{
            name: 'city',
            data: lodash.uniq(guatemala.filter(e => e.admin_name === department).map(e => e.city)),
            type: 'select'
          }}
        />
        {<FormFactory translate={translate} isUpdate={updating} theme={theme} formElements={FormElements(timeZone)} />}
      </div>
    </>
  )
}
export default FormGeneralInfo
