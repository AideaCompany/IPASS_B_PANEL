import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getLocalizationProps } from '../../providers/LenguageContext'
const dashboard = () => {
  return <></>
}

export default dashboard

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
