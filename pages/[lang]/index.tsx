import { GetStaticPaths, GetStaticProps } from 'next'
//component
import { Localization } from '../../i18n/types'
import { getLocalizationProps } from '../../providers/LenguageContext'
const dashboard = (props: { localization: Localization }) => {
  return <></>
}

export default dashboard

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
