//Graphql
import Powered from '@/components/Powered'
import { ThemeContext } from '@/providers/ThemeContext'
import { gql, useMutation } from '@apollo/client'
//AntDesign
import { Button, Form, Input } from 'antd'
//Next
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import ChangeTheme from '../../../components/layout/ChangeTheme'
import LocaleSwitcher from '../../../components/layout/LocaleSwitcher'
//components
import Main from '../../../components/main'
import { confirmSignUp } from '../../../graphql/mutation'
import { Localization } from '../../../i18n/types'
import useAuth from '../../../providers/AuthContext'
//Provider
import { getLocalizationProps, LanguageProvider } from '../../../providers/LenguageContext'

type passwordForm = {
  password: string
  confirmPassword: string
}

export default function SignIn(props: { localization: Localization }): JSX.Element {
  //Props
  const { localization } = props
  //provider
  const { login, setLoading } = useAuth()
  const { theme } = useContext(ThemeContext)
  const router = useRouter()
  //functions
  const confirmSignUpForm = (data: passwordForm) => {
    setLoading(true)
    confirmSignupTrigger({
      variables: { input: { password: data.password, _id: router.query.id } }
    })
      .then(res => {
        login(res.data.confirmSignUp.token)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }

  const [confirmSignupTrigger] = useMutation(gql(confirmSignUp))
  return (
    <LanguageProvider localization={localization}>
      <Main title={localization.translations.titleSingup}>
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
              <Form style={{ marginTop: '1em' }} onFinish={confirmSignUpForm}>
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
                    {localization.translations.buttonToken}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <Powered theme={theme} />
        </div>
      </Main>
    </LanguageProvider>
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
