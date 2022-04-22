/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, InputNumber, Select, Switch, TimePicker } from 'antd'
import FormItem from 'antd/lib/form/FormItem'
import { capitalize } from 'fogg-utils'
import moment from 'moment-timezone'
import React from 'react'
import { ITranslations } from '../../i18n/types'
import { ColumnFactoryType, FormFactory } from '@/types/typeTemplate'
import TableComponent from './TableComponents'
import UploadButton from './uploadButton'
import UploadPhoto from './uploadPhoto'
import countries from 'country-data'
const { TextArea } = Input

const formFactory = (propsElements: {
  formElements: FormFactory.IFormFactoryType<any>[]
  translate: ITranslations
  isUpdate: boolean
  theme: string
}): JSX.Element => {
  const selectCountry = (
    <Form.Item name="indicativo" noStyle>
      <Select allowClear defaultValue={'+502'} style={{ width: 100 }}>
        {countries?.callingCountries?.all.map((e, i) => (
          <Select.Option key={i} value={e.countryCallingCodes[0]}>
            {e.emoji} {e.alpha2}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  )

  const { formElements, translate, isUpdate, theme } = propsElements
  const seeDummies = !process.env.NEXT_PUBLIC_PROD && !isUpdate
  return (
    <>
      {formElements.map((element, i) => {
        const rules = {
          required: element.required,
          message: translate[`error${capitalize(element.name)}`] ? translate[`error${capitalize(element.name)}`] : translate['requiredField']
        }
        const inicialProps = {
          rules: [rules],
          name: element.name
        }
        let props = {}
        let content: JSX.Element = <></>
        if (element.visible === undefined) {
          element.visible = true
        }
        if (element.visible) {
          switch (element.type) {
            case 'string':
              props = {
                ...inicialProps,
                rules: [{ type: 'string', ...rules }],
                ...(seeDummies ? { initialValue: 'prueba' } : null)
              }
              content = <Input placeholder={translate[element.name]} {...element.adicionalProps} autoComplete="off" />
              break
            case 'number':
              props = {
                ...(seeDummies ? { initialValue: 123456 } : null),
                ...inicialProps,
                rules: [{ type: 'number', ...rules }]
              }
              content = <InputNumber placeholder={translate[element.name]} {...element.adicionalProps} autoComplete="off" />
              break
            case 'phone':
              props = {
                ...inicialProps,
                rules: [{ type: 'string', ...rules }],
                ...(seeDummies ? { initialValue: '12355452' } : null)
              }

              content = <Input addonBefore={selectCountry} placeholder={translate[element.name]} {...element.adicionalProps} autoComplete="off" />
              break

            case 'email':
              props = {
                ...(seeDummies ? { initialValue: 'test@gmail.com' } : null),
                ...inicialProps,
                rules: [{ type: 'email', ...rules }]
              }
              content = <Input placeholder={translate[element.name]} {...element.adicionalProps} autoComplete="off" />
              break
            case 'hour':
              props = {
                ...(seeDummies ? { initialValue: moment() } : null),
                ...inicialProps,
                rules: [{ ...rules }]
              }
              content = <TimePicker format={'HH:mm'} allowClear placeholder={translate[element.name]} />
              break
            case 'date':
              props = {
                ...(seeDummies ? { initialValue: moment() } : null),
                ...inicialProps,
                rules: [{ type: 'date', ...rules }]
              }
              content = (
                <DatePicker
                  showTime
                  use12Hours
                  allowClear={true}
                  showNow={false}
                  placeholder={translate[element.name]}
                  format="DD/MM/YYYY HH:mm"
                  dropdownClassName={`picker${theme}`}
                />
              )
              break
            case 'boolean':
              props = {
                ...(seeDummies ? { initialValue: true } : null),
                ...inicialProps,
                valuePropName: 'checked',
                rules: [{ type: 'boolean', ...rules }]
              }
              return (
                <div style={{ display: 'flex' }} className={element.fullWidth ? 'fullWidth' : ''} key={i}>
                  <h3 style={{ paddingRight: '20px' }}>{translate[typeof element.name === 'object' ? element.name[1] : element.name]}:</h3>
                  <Form.Item {...props}>{<Switch />}</Form.Item>
                </div>
              )

            case 'select':
              props = {
                //@ts-ignore
                ...(seeDummies ? (element.data ? { initialValue: element.data[0]?._id ? element.data[0]?._id : element.data[0] } : null) : null),
                ...inicialProps
              }

              content = (
                <Select
                  {...element.adicionalProps}
                  allowClear
                  showSearch
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
              )
              break
            case 'selectMultiple':
              props = {
                ...(seeDummies
                  ? element.data
                    ? //@ts-ignore
                      { initialValue: element.data[0] ? (element.data[0]?._id ? [element.data[0]?._id] : [element.data[0]]) : [] }
                    : []
                  : []),
                ...inicialProps
              }
              content = (
                <Select
                  mode="multiple"
                  allowClear
                  showSearch
                  placeholder={translate[element.name]}
                  {...element.adicionalProps}

                  // filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {
                    //@ts-ignore
                    element.data?.map((c: { name: string; _id: string } | string) => {
                      // console.log(c)
                      if (Object.keys(c).findIndex(e => e === '_id') !== -1) {
                        // console.log(c._id)

                        return (
                          <Select.Option key={(c as { name: string; _id: string })._id} value={(c as { name: string; _id: string })._id}>
                            {(c as { name: string; _id: string }).name}
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
              )
              break
            case 'textArea':
              props = {
                ...inicialProps,
                rules: [{ type: 'string', ...rules }],
                ...(seeDummies ? { initialValue: 'prueba' } : null)
              }
              content = <TextArea placeholder={translate[element.name]} {...element.adicionalProps} autoComplete="off" />
              break
            case 'table':
              return (
                <div key={i} className={element.fullWidth ? 'fullWidth' : ''}>
                  <FormItem name={element.name} noStyle>
                    {
                      <TableComponent
                        //  @ts-ignore
                        inicialData={element.inicialData}
                        translations={translate}
                        name={element.name}
                        theme={theme}
                        actualRef={element.actualFormRef}
                        columns={element.columnsItem as ColumnFactoryType<any>[]}
                        FormItems={element.FormItems as any}
                      />
                    }
                  </FormItem>
                </div>
              )
            case 'dynamic':
              return (
                <div className={element.fullWidth ? 'fullWidth' : ''} key={i}>
                  <Form.List name={element.name}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => {
                          const items = element.formListElements
                            ? element.formListElements.map(listElement => ({
                                ...listElement,

                                name: [field.name, listElement.name],

                                adicionalProps: { ...field }
                              }))
                            : []
                          return (
                            <div key={index} className={'formContainer'}>
                              {formFactory({ translate: translate, isUpdate: isUpdate, formElements: items, theme: theme })}
                              {fields.length > 1 ? (
                                <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                              ) : null}
                            </div>
                          )
                        })}
                        <Form.Item>
                          <Button shape={'round'} type="dashed" onClick={() => add()} style={{ width: '100%' }} icon={<PlusOutlined />}>
                            {translate.addNew}
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </div>
              )
            case 'avatar':
              return (
                <div style={{ display: element.show ? 'initial' : 'none' }} className={element.fullWidth ? 'fullWidth' : ''} key={i}>
                  <h3>{translate[typeof element.name === 'object' ? element.name[1] : element.name]}:</h3>
                  <UploadPhoto
                    required={element.required as boolean}
                    //@ts-ignore
                    inicialData={element.inicialData}
                    name={element.name}
                    translate={translate[element.name] as any}
                  />
                </div>
              )
            case 'upload':
              return (
                <div className={element.fullWidth ? 'fullWidth' : ''} key={i}>
                  <h3>{translate[typeof element.name === 'object' ? element.name[1] : element.name]}:</h3>
                  {/*@ts-ignore*/}
                  <UploadButton inicialData={element.inicialData} inicialProps={inicialProps} translate={translate} />
                </div>
              )

            case 'dateNoTime':
              props = {
                ...(seeDummies ? { initialValue: moment() } : null),
                ...inicialProps,
                rules: [{ type: 'date', ...rules }]
              }
              content = (
                <DatePicker
                  allowClear={true}
                  showNow={false}
                  placeholder={translate[element.name]}
                  format="DD/MM/YYYY"
                  dropdownClassName={`picker${theme}`}
                />
              )
              break

            case 'dateRange':
              props = {
                ...(seeDummies ? { initialValue: [moment(), moment()] } : null),
                ...inicialProps,
                rules: [{ ...rules }]
              }
              content = (
                <DatePicker.RangePicker
                  showTime
                  use12Hours
                  allowClear={true}
                  showNow={false}
                  //@ts-ignore
                  placeholder={translate[element.name]}
                  format="DD/MM/YYYY h:mm a"
                  dropdownClassName={`picker${theme}`}
                  {...element.adicionalProps}
                />
              )
              break

            default:
              break
          }
          return (
            <div className={element.fullWidth ? 'fullWidth' : ''} key={i}>
              <h3>{translate[typeof element.name === 'object' ? element.name[1] : element.name]}:</h3>
              <Form.Item {...props}>{content}</Form.Item>
            </div>
          )
        } else {
          return <></>
        }
      })}
    </>
  )
}

export default React.memo(formFactory)
