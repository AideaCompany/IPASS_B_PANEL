//Graphql
import IPassAuthenticator from '@/components/IPassAuthenticator/IPassAuthenticator'
import Powered from '@/components/Powered'
import { ThemeContext } from '@/providers/ThemeContext'
import { getStaffFn } from '@/services/staff'
import { IStaff } from '@/types/interfaces/staff/staff.interface'
import { IUser } from '@/types/interfaces/user/User.interface'
import { gql, useMutation } from '@apollo/client'
//AntDesign
import { Button, Checkbox, Descriptions, Form, Input, message, Modal } from 'antd'
import jwt from 'jsonwebtoken'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ChangeTheme from '../../../components/layout/ChangeTheme'
import LocaleSwitcher from '../../../components/layout/LocaleSwitcher'
//components
import Main from '../../../components/main'
import { $security } from '../../../config'
import client from '../../../graphql/config'
import * as mutation from '../../../graphql/mutation'
import { firstLogin } from '../../../graphql/queries'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { getInitialLocale } from '../../../i18n/getInitialLocale'
import { Localization } from '../../../i18n/types'
//providers
import useAuth from '../../../providers/AuthContext'
//context
import { getLocalizationProps, LanguageProvider } from '../../../providers/LenguageContext'

const SignIn = (props: { localization: Localization }): JSX.Element => {
  //Props
  const { localization } = props
  const router = useRouter()
  //state`
  const [isConfirm, setIsConfirm] = useState<boolean>(false)
  const [isForgot, setIsForgot] = useState<boolean>(false)
  const [textForgotPassword, setTextForgotPassword] = useState<string>('')
  //provider
  const { user, login, setSpinning } = useAuth()
  const { theme } = useContext(ThemeContext)
  const [worker, setWorker] = useState<IStaff | null>()
  //hhoks
  const [getStoredLocale] = useLocalStorage<string>('init_config', '')
  //effect
  useEffect(() => {
    setSpinning(false)
    if (user._id && router) {
      router.push({ pathname: '/[lang]/dashboard', query: { lang: localization.locale } })
    }
  }, [user, router])

  //effect
  useEffect(() => {
    if (getStoredLocale === '') {
      client
        .query({ query: gql(firstLogin) })
        .then(res => {
          if (!res.data.firstLogin) {
            router.push({
              pathname: '/[lang]/session/signup_config',
              query: { lang: getInitialLocale() }
            })
          }
        })
        .catch(err => console.info(err))
    } else {
      if (!getStoredLocale) {
        if (router.route !== '/[lang]/session/signup_config') {
          router.push({
            pathname: '/[lang]/session/signup_config',
            query: { lang: getInitialLocale() }
          })
        }
      }
    }
  }, [])

  //functions
  const loginForm = ({ email, password }: IUser) => {
    setSpinning(true)
    loginTrigger({ variables: { input: { email, password, lang: localization.locale } } })
      .then(res => {
        if (res.data.login.response === 'cant') {
          setSpinning(false)
          message.error('Sin autorización')
        } else if (res.data.login.response === 'ok') {
          setSpinning(false)
          setIsConfirm(true)
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          login(res.data.login.token)
          // router.push({ pathname: '/[lang]/dashboard', query: { lang: localization.locale } })
        }
      })
      .catch(err => {
        console.info(err)
      })
      .finally(() => setSpinning(false))
  }

  const confirmLoginForm = (data: { token: string }) => {
    setSpinning(true)
    loginConfirmTrigger({ variables: { input: { token: data.token } } })
      .then(res => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        login(res.data.confirmLogin.token)
        router.push({ pathname: '/[lang]/dashboard', query: { lang: localization.locale } })
        setSpinning(false)
      })
      .catch(err => {
        setSpinning(false)
        console.info(err)
      })
  }

  const forgotPasswordForm = (data: { email: string }) => {
    setSpinning(true)
    forgotPasswordTrigger({ variables: { input: { email: data.email, lang: localization.locale } } })
      .then(res => {
        if (res.data.forgotPassword.response === 'ok') {
          setTextForgotPassword(localization?.translations.messageAfterSubmidForgor)
        }
        setSpinning(false)
      })
      .catch(err => {
        console.info(err)
        setSpinning(false)
      })
  }
  const [visibleWorker, setVisibleWorker] = useState(false)
  const [loginTrigger] = useMutation(gql(mutation.login))
  const [loginConfirmTrigger] = useMutation(gql(mutation.confirmLogin))
  const [forgotPasswordTrigger] = useMutation(gql(mutation.forgotPassword))
  const forWorker = async (token: string) => {
    const data = jwt.verify(token, $security.secretKey) as { data: { _id: string } }
    setWorker(await getStaffFn(data.data._id))
    setVisibleWorker(true)
  }

  const handleCloseWorker = () => {
    setWorker(null)
    setVisibleWorker(false)
  }

  return (
    <LanguageProvider localization={localization}>
      <Main title={localization.translations.titleSinIn}>
        <div className="mainContainerLogin">
          <div className="elementsProvider">
            <ChangeTheme></ChangeTheme>
            <LocaleSwitcher />
          </div>
          <div className="containerForm">
            <div className="title">
              <h1>{localization.translations.titleSinIn}</h1>
            </div>
            <div className="inputs">
              {!isConfirm && !isForgot && (
                <>
                  <span>{localization.translations.welcome}</span>
                  <Form style={{ marginTop: 20 }} onFinish={loginForm} layout="vertical">
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
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: localization.translations.errorPassword
                        }
                      ]}
                    >
                      <Input.Password placeholder={localization.translations.inputPassword} />
                    </Form.Item>
                    <Form.Item>
                      <Button shape={'round'} style={{ width: '100%' }} htmlType="submit" type={'primary'}>
                        {localization.translations.buttonSignin}
                      </Button>
                      <IPassAuthenticator onLogin={(val, isWorker) => (isWorker ? forWorker(val) : login(val))} />
                    </Form.Item>

                    <div className="optionsSignIn">
                      <Form.Item>
                        <Checkbox>{localization.translations.remember}</Checkbox>
                      </Form.Item>
                      <span onClick={() => setIsForgot(true)} className="forgot">
                        {localization.translations.forgotPassword}
                      </span>
                    </div>
                  </Form>
                </>
              )}
              {isConfirm && (
                <>
                  <span>{localization.translations.messageLoginVerification}</span>
                  <Form style={{ marginTop: 20 }} onFinish={confirmLoginForm}>
                    <Form.Item
                      name="token"
                      rules={[
                        {
                          required: true,
                          message: localization.translations.errorEmail
                        }
                      ]}
                    >
                      <Input placeholder={localization.translations.inputToken} />
                    </Form.Item>
                    <Form.Item>
                      <Button shape={'round'} style={{ width: '100%', marginBottom: '1em' }} htmlType="submit" type={'primary'}>
                        {localization.translations.buttonToken}
                      </Button>
                      <span onClick={() => setIsConfirm(false)} className="goBack">
                        {localization.translations.goBack}
                      </span>
                    </Form.Item>
                  </Form>
                </>
              )}
              {isForgot && (
                <>
                  {textForgotPassword === '' ? (
                    <>
                      <span>{localization.translations.messagePreForgotPassword}</span>
                      <Form style={{ marginTop: 20 }} onFinish={forgotPasswordForm}>
                        <Form.Item name="email" rules={[{ required: true, message: localization.translations.errorTokenConfirm }]}>
                          <Input placeholder={localization.translations.inputEmail} />
                        </Form.Item>
                        <Form.Item>
                          <Button shape={'round'} style={{ width: '100%', marginBottom: '1em' }} htmlType="submit" type={'primary'}>
                            {localization.translations.buttonToken}
                          </Button>
                          <span onClick={() => setIsForgot(false)} className="goBack">
                            {localization.translations.goBack}
                          </span>
                        </Form.Item>
                      </Form>
                    </>
                  ) : (
                    <>
                      <span>{textForgotPassword}</span>
                      <span onClick={() => setIsForgot(false)} className="goBack">
                        {localization.translations.goBack}
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <Powered theme={theme} />
          <Modal onOk={handleCloseWorker} onCancel={handleCloseWorker} visible={visibleWorker} className={`modalCrud${theme}`}>
            <Descriptions column={1} title="Información del trabajador">
              <Descriptions.Item label="Nombre">{worker?.name}</Descriptions.Item>
              <Descriptions.Item label="Apellido">{worker?.lastName}</Descriptions.Item>
              <Descriptions.Item label="Tipo Documento">{worker?.name1}</Descriptions.Item>
              <Descriptions.Item label="DPI">{worker?.name}</Descriptions.Item>
            </Descriptions>
          </Modal>
        </div>
      </Main>
    </LanguageProvider>
  )
}

export const getStaticProps: GetStaticProps = ctx => {
  const localization = getLocalizationProps(ctx, 'auth')
  return {
    props: {
      localization
    }
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: ['es', 'en'].map(lang => ({ params: { lang } })),
    fallback: false
  }
}

export default SignIn
