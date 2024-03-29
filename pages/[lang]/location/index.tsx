//react
//Components
import MainLayout from '@/components/layout/Layout'
import columns from '@/components/location/columns'
import TableData from '@/components/TableDatas'
//types
import { Localization } from '@/i18n/types'
import useAuth from '@/providers/AuthContext'
//Context
import { getLocalizationProps } from '@/providers/LenguageContext'
import { convertTotableOne } from '@/utils/utils'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
//next
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getAllLocationActive } from 'services/locations'
import { IPermissionsPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'
type actualItem = ILocation

const masterLocation = (props: { localization: Localization; lang: string }) => {
  //props
  const { localization, lang } = props
  //states
  const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  const [data, setData] = useState<actualItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [toUpdate] = useState<actualItem[]>([])
  //providers
  const { permission } = useAuth()
  //Effect
  useEffect(() => {
    setActualPermission(permission.permissions?.find(e => e.sectionName === 'Location'))
  }, [permission])

  useEffect(() => {
    if (toUpdate.length > 0) {
      const oldData: ILocation[] = JSON.parse(JSON.stringify(data))
      toUpdate.forEach(element => {
        switch (element.operation) {
          case 'create':
            oldData.push(convertTotableOne(element))
            break
          case 'update':
            oldData[oldData.findIndex(e => e._id === element._id)] = convertTotableOne(element)
            break
          case 'delete':
            oldData.splice(
              oldData.findIndex(e => e._id === element._id),
              1
            )
        }
      })
      setData([...oldData])
    }
  }, [toUpdate])

  useEffect(() => {
    if (actualPermission) {
      getData()
    }
  }, [actualPermission])

  const getData = async () => {
    setLoading(true)
    const locations = await getAllLocationActive()
    setData(locations)
    setLoading(false)
  }

  const create = (
    <>
      {actualPermission?.create && (
        <Tooltip title={localization.translations.titleModalCreate}>
          <Link href={{ pathname: '/[lang]/location/create', query: { lang } }}>
            <Button
              style={{ margin: '5px' }}
              onClick={() => {
                console.info('click')
              }}
              shape="circle"
              icon={<PlusOutlined />}
            />
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
            actualPermission: actualPermission as IPermissionsPrivilege,
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

export const getStaticProps: GetStaticProps = ctx => {
  const localization = getLocalizationProps(ctx, 'location')
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
