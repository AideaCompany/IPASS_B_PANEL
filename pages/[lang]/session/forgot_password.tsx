import Powered from '@/components/Powered'
import { ThemeContext } from '@/providers/ThemeContext'
//Graphql
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
import { changePassword } from '../../../graphql/mutation'
//Types
import { Localization } from '../../../i18n/types'
import useAuth from '../../../providers/AuthContext'
//Provider
import { getLocalizationProps, LanguageProvider } from '../../../providers/LenguageContext'

type passwordForm = {
  password: string
  confirmPassword: string
}

const SignIn = (props: { localization: Localization }): JSX.Element => {
  //Props
  const { localization } = props
  //provider
  const { login, setLoading } = useAuth()
  const { theme } = useContext(ThemeContext)
  const router = useRouter()
  //functions

  const changePasswordForm = (data: passwordForm) => {
    setLoading(true)
    changePasswordTrigger({
      variables: { input: { password: data.password, _id: router.query.id } }
    })
      .then(res => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        login(res.data.changePassword.token)
        setLoading(false)
      })
      .catch(err => console.info(err))
  }

  const [changePasswordTrigger] = useMutation(gql(changePassword))

  return (
    <LanguageProvider localization={localization}>
      <Main title={localization.translations.titleForgot}>
        <div className="mainContainerLogin">
          <div className="elementsProvider">
            <ChangeTheme />
            <LocaleSwitcher />
          </div>
          <div className="containerForm">
            <div className="title">
              <h1>{localization.translations.titleForgot}</h1>
            </div>
            <div className="inputs">
              <Form style={{ marginTop: '1em' }} onFinish={changePasswordForm}>
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
                  <Input.Password placeholder={localization.translations.inputNewPassword} />
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
