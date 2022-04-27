//react
//Components
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/products/columns'
import TableData from '@/components/TableDatas'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { getAllBrands } from '@/services/brands'
import { getAllProductsFn } from '@/services/products'
import { listAllServicesFn } from '@/services/services'
import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IProduct, IService } from '@/types/types'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface actualItem extends IProduct {}

const Products = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props

  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setdata] = useState<actualItem[]>([])
  const [services, setServices] = useState<IService[]>([])
  const [loading, setloading] = useState<boolean>(true)
  const [brands, setBrands] = useState<IBrands[]>([])
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Products'))
  }, [permission])

  useEffect(() => {
    ;(async () => {
      if (actualPermission) {
        getData()
      }
    })()
  }, [actualPermission])

  const getData = async () => {
    setloading(true)
    const data = await getAllProductsFn()
    setdata(data)
    const services = await listAllServicesFn()
    setBrands(await getAllBrands())
    console.log('esto es serivcios', services)
    setServices(services)
    setloading(false)
  }

  const goToCreate = () => (
    <Tooltip title="Crear producto">
      <Link href={{ pathname: '/[lang]/products/create', query: { lang } }}>
        <a>
          <Button style={{ margin: '5px' }} shape="circle" icon={<PlusOutlined />} />
        </a>
      </Link>
    </Tooltip>
  )

  return (
    <>
      <MainLayout create={goToCreate()} getData={getData} lang={lang} title={localization?.translations.titleSection}>
        <>
          <TableData
            columns={columns({
              translations: localization.translations,
              actualPermission: actualPermission as IPermissionsPrivilege,
              permision: permission,
              lang: lang,
              services,
              after: getData,
              brands
            })}
            data={data}
            loading={loading}
          />
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(Products)

export const getStaticProps: GetStaticProps = async ctx => {
  const localization = getLocalizationProps(ctx, 'products')
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
