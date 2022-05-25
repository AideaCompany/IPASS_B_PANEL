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
import { getAllProductsFn } from '@/services/products'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IProduct } from '@/types/interfaces/Product/Product.interface'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
//next
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface actualItem extends IProduct {}

const Products = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props

  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setData] = useState<actualItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
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
    setLoading(true)
    const data = await getAllProductsFn()
    setData(data)
    setLoading(false)
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

              after: getData
            })}
            scroll={{ x: 1500, y: '60vh' }}
            data={data}
            loading={loading}
          />
        </>
      </MainLayout>
    </>
  )
}

export default React.memo(Products)

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const localization = getLocalizationProps(ctx, 'products')
    const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
    const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 10
    return { props: { localization, page, limit } }
  } catch (e) {
    return {
      notFound: true
    }
  }
}
