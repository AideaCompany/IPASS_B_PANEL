//Graphql
import Powered from '@/components/Powered'
import useData from '@/providers/DataContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { verifyKeyFn } from '@/services/auth'
import { gql, useMutation } from '@apollo/client'
//AntDesign
import { Button, Form, Input, message } from 'antd'
//Next
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ChangeTheme from '../../../components/layout/ChangeTheme'
import LocaleSwitcher from '../../../components/layout/LocaleSwitcher'
//components
import Main from '../../../components/main'
import { confirmUser, createFirstUser } from '../../../graphql/mutation'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { getInitialLocale } from '../../../i18n/getInitialLocale'
import { Localization } from '../../../i18n/types'
import useAuth from '../../../providers/AuthContext'
//Provider
import { getLocalizationProps } from '../../../providers/LenguageContext'
//Types
import { iUserForm } from '../../../types/types'

export default function SignIn(props: { localization: Localization }): JSX.Element {
  //Props
  const { localization } = props
  const router = useRouter()
  //State
  const [confirmForm, setConfirmForm] = useState<boolean>(false)
  const [lic, setLic] = useState(true)
  const [getStoredLocale, setStoredLocale] = useLocalStorage('init_config')
  //provider
  const { login, setSpinning } = useAuth()
  const { getData } = useData()
  const { theme } = useContext(ThemeContext)

  //Effect
  useEffect(() => {
    setSpinning(false)
    if (getStoredLocale && !confirmForm) {
      router.push(`/${getInitialLocale()}/session`)
    }
  }, [getStoredLocale])

  //functions
  const signUp = async (data: iUserForm) => {
    delete data['confirmPassword']
    setSpinning(true)
    await getData()
    signUpTrigger({
      variables: { input: { ...data, lang: localization.locale } }
    })
      .then(res => {
        if (res.data.createFirstUser.token === 'ok') {
          setConfirmForm(true)
          setSpinning(false)
        }
      })
      .catch(err => {
        console.error(err)
        setSpinning(false)
      })
  }

  const confirmSignUp = (data: { token: string }) => {
    setSpinning(true)
    confirmUserTrigger({
      variables: { input: { token: data.token, lang: localization.locale } }
    })
      .then(async res => {
        setStoredLocale(true)
        await login(res.data.confirmUser.token, true)
        setSpinning(false)
      })
      .catch(err => {
        message.error({ content: err.message, duration: 10, className: theme, key: 'err' })
        setSpinning(false)
      })
  }

  const verifyKey = async ({ key }: { key: string }) => {
    try {
      setSpinning(true)
      const res = await verifyKeyFn(key)
      if (res) {
        message.success('Clave Correcta')
        setLic(false)
      } else {
        message.warning('Clave invalida')
      }
    } catch (error) {
      message.error('Algo salio mal')
    } finally {
      setSpinning(false)
    }
  }

  const [confirmUserTrigger] = useMutation(gql(confirmUser))
  const [signUpTrigger] = useMutation(gql(createFirstUser))

  return (
    <Main title={localization.translations.titleSingup}>
      <>
        <div className="mainContainerLogin">
          <div className="elementsProvider">
            <ChangeTheme />
            <LocaleSwitcher />
          </div>
          <div className="containerForm">
            <div className="title">
              <h1>{localization.translations.titleSingup}</h1>
            </div>
            <div className="inputs">
              {lic ? (
                <Form onFinish={verifyKey} layout="vertical">
                  <Form.Item
                    name="key"
                    rules={[
                      {
                        required: true,
                        message: 'Debes ingresar la llave para continuar'
                      }
                    ]}
                  >
                    <Input placeholder={'Llave de activación'}></Input>
                  </Form.Item>
                  <Form.Item>
                    <Button shape={'round'} style={{ width: '100%', marginBottom: '1em' }} htmlType="submit" type={'primary'}>
                      Continuar
                    </Button>
                  </Form.Item>
                </Form>
              ) : !confirmForm ? (
                <Form onFinish={signUp} layout="vertical">
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: localization.translations.errorName
                      }
                    ]}
                  >
                    <Input placeholder={localization.translations.inputName}></Input>
                  </Form.Item>
                  <Form.Item
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: localization.translations.errorLastname
                      }
                    ]}
                  >
                    <Input placeholder={localization.translations.inputLastname}></Input>
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: localization.translations.errorEmail
                      }
                    ]}
                  >
                    <Input placeholder={localization.translations.inputEmail} />
                  </Form.Item>
                  <Form.Item
                    name="document"
                    rules={[
                      {
                        required: true,
                        message: localization.translations.errorDocument
                      }
                    ]}
                  >
                    <Input placeholder={localization.translations.inputDocument} />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: localization.translations.errorPhone
                      }
                    ]}
                  >
                    <Input placeholder={localization.translations.inputPhone} />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: localization.translations.errorPassword
                      }
                    ]}
                  >
                    <Input.Password placeholder={localization.translations.inputPassword} />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: localization.translations.errorConfirmPassword
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(localization.translations.errorConfirmPassword2)
                        }
                      })
                    ]}
                  >
                    <Input.Password placeholder={localization.translations.inputPasswordRepit} />
                  </Form.Item>
                  <Form.Item>
                    <Button shape={'round'} style={{ width: '100%', marginBottom: '1em' }} htmlType="submit" type={'primary'}>
                      {localization.translations.buttonSignin}
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <>
                  <span>{localization.translations.messagePreVerification}</span>
                  <Form style={{ marginTop: '1em' }} onFinish={confirmSignUp}>
                    <Form.Item
                      name="token"
                      rules={[
                        {
                          required: true,
                          message: localization.translations.errorTokenConfirm
                        }
                      ]}
                    >
                      <Input placeholder={localization.translations.inputToken} />
                    </Form.Item>
                    <Form.Item>
                      <Button shape={'round'} style={{ width: '100%', marginBottom: '1em' }} htmlType="submit" type={'primary'}>
                        {localization.translations.buttonToken}
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              )}
            </div>
          </div>
          <Powered theme={theme} />
        </div>
      </>
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'auth')
  return {
    props: {
      localization
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}
