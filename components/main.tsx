import React, { useContext } from 'react'
import Head from 'next/head'
import { ThemeContext } from '../providers/ThemeContext'
import useAuth from '../providers/AuthContext'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { LanguageContext } from '../providers/LenguageContext'

export default function main(props: { children: JSX.Element; title?: string }): JSX.Element {
  //props
  const { children, title } = props
  //provider
  const { theme } = useContext(ThemeContext)
  const { spinning } = useAuth()
  const { localization } = useContext(LanguageContext)

  return (
    <>
      <Head>
        <title>{`IPASS R  + | ${title}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className={`mainContainerApp${theme}`}>
        {spinning && (
          <div className="loading">
            <Spin indicator={<LoadingOutlined />} tip={localization.translations.loading} spinning={spinning} size="large"></Spin>
          </div>
        )}
        {children}
      </main>
    </>
  )
}
