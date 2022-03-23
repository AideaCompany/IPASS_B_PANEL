//react
//Components
import columns from '@/components/device/columns'
import RegisterDevices from '@/components/device/RegisterDevices'
import MainLayout from '@/components/layout/Layout'
import TableData from '@/components/TableDatas'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllExistingDevices } from '@/services/device'
import { IDevice, PermissionsPrivilege } from '@/types/types'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
interface actualItem extends IDevice {}

const masterLocation = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props
  //states
  const [actualPermission, setActualPermission] = useState<PermissionsPrivilege>()
  const [data, setData] = useState<actualItem[]>([])
  /* const [locations, setLocations] = useState<ILocation[]>([]) */
  const [loading, setLoading] = useState<boolean>(true)
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Device'))
  }, [permission])

  useEffect(() => {
    ;(async () => {
      if (actualPermission) {
        getData()
      }
    })()
  }, [actualPermission])

  const getData = async () => {
    setLoading(true)
    setData(await getAllExistingDevices())
    /* setLocations(await getAllLocationActive()) */
    setLoading(false)
  }

  const create = (
    <>
      <RegisterDevices translations={localization.translations} devices={data.filter(e => e.status === 'occupied')} />
      {actualPermission?.create && (
        <Tooltip title={localization.translations.titleModalCreate}>
          <Link href={{ pathname: '/[lang]/device/create', query: { lang } }}>
            <Button style={{ margin: '5px' }} onClick={() => {}} shape="circle" icon={<PlusOutlined />} />
          </Link>
        </Tooltip>
      )}
    </>
  )

  return (
    <>
      <MainLayout create={create} getData={getData} lang={lang} title={localization?.translations.titleSection}>
        <TableData
          columns={columns({
            translations: localization.translations,
            actualPermission: actualPermission as PermissionsPrivilege,
            permision: permission,
            lang: lang,
            after: getData
          })}
          data={data}
          loading={loading}
        />
      </MainLayout>
    </>
  )
}

export default React.memo(masterLocation)

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'device')
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
