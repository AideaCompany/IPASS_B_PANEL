//react
//Components
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/risk/columns'
import columnsTime from '@/components/riskReset/columns'
import TableData from '@/components/TableDatas'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllRisks } from '@/services/risk'
import { getResetTime } from '@/services/riskReset'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IRisk } from '@/types/interfaces/Risk/Risk.interface'
import { IRiskReset } from '@/types/interfaces/RiskReset/RiskReset.interface'
/* import { getAllAuthenticator } from '@/services/risk' */

import { FileOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type actualItem = IRisk
const visitorCategory = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props

  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setdata] = useState<actualItem[]>([])
  const [resetTime, setResetTime] = useState<IRiskReset[]>([])

  const [loading, setloading] = useState<boolean>(true)
  //providers
  const { permission } = useAuth()
  const router = useRouter()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Risk'))
  }, [permission])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission])

  const getData = async () => {
    setloading(true)
    setdata(await getAllRisks())
    setResetTime(await getResetTime())
    setloading(false)
  }

  const create = (
    <Tooltip title={'Ver registro de riesgos'}>
      <Button
        style={{ margin: '5px' }}
        onClick={() => router.push({ pathname: '/[lang]/risk/report', query: { lang: router.query.lang } })}
        shape="circle"
        icon={<FileOutlined />}
      />
    </Tooltip>
  )

  return (
    <>
      <MainLayout create={create} getData={getData} lang={lang} title={localization?.translations.titleSection} hideButtons={false}>
        <>
          <h2>{localization.translations.titleSeverity}</h2>
          <TableData
            columns={columns({
              translations: localization.translations,
              actualPermission: actualPermission as IPermissionsPrivilege,
              permision: permission,
              lang: lang,
              after: getData
            })}
            data={data}
            loading={loading}
          />
          <h2>{localization.translations.titleReset}</h2>
          <TableData
            columns={columnsTime({
              translations: localization.translations,
              actualPermission: actualPermission as IPermissionsPrivilege,
              permision: permission,
              lang: lang,
              after: getData
            })}
            data={resetTime}
            loading={loading}
          />
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(visitorCategory)

export const getStaticProps: GetStaticProps = ctx => {
  const localization = getLocalizationProps(ctx, 'risk')
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
