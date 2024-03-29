//types
import { unBanUser } from '@/graphql/breach/mutations/unBanUser'
import { ITranslations } from '@/i18n/types'
import { ThemeContext } from '@/providers/ThemeContext'
import { Tag } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { ColumnType } from 'antd/lib/table'
import { gql } from 'apollo-boost'
import moment from 'moment-timezone'
import React, { useContext } from 'react'
//component
import ColumnFactory from '../crudFunctions/columnFactory'
import UnBan from './UnBan'
import { IPermissionsPrivilege, IPrivilege } from '@/types/interfaces/Privilege/Privilege.interface'
import { IBreach } from '@/types/interfaces/Breach/Breach.inteface'
import { ILocation } from '@/types/interfaces/Location/Location.interface'

const columns = (props: {
  translations: ITranslations
  actualPermission: IPermissionsPrivilege
  permision: IPrivilege
  lang: string
  beforeShowUpdate?: (param: any) => any
  after: () => void
}): ColumnType<IBreach>[] => {
  const { translations } = props
  const { theme } = useContext(ThemeContext)
  const operations = (record: any) => {
    if (record.user && record.user.banFinish && moment.tz('America/Guatemala').isAfter(record.user.banFinish) === false) {
      return (
        <>
          <UnBan translations={translations} mutation={gql(unBanUser)} theme={theme} record={record} />
        </>
      )
    } else if (record.worker && record.worker.banFinish && moment.tz('America/Guatemala').isAfter(record.worker.banFinish) === false) {
      return (
        <>
          <UnBan translations={translations} mutation={gql(unBanUser)} theme={theme} record={record} />
        </>
      )
    } else if (record.contact && record.contact.banFinish && moment.tz('America/Guatemala').isAfter(record.contact.banFinish) === false) {
      return (
        <>
          <UnBan translations={translations} mutation={gql(unBanUser)} theme={theme} record={record} />
        </>
      )
    } else {
      return (
        <>
          <LockOutlined disabled={true} style={{ color: '#C5C5C5', pointerEvents: 'none' }} />
        </>
      )
    }
  }

  return ColumnFactory({
    columns: [
      {
        name: 'createdAt',
        search: true,
        customRender: (record: any) => {
          //console.log(moment(record.createdAt).format())
          return moment.tz(record, 'America/Guatemala').format('DD/MM/YYYY hh:mm:ss A')
        }
      },
      {
        name: 'grade',
        search: true
      },
      {
        name: 'location',
        customRender: (record: IBreach) => {
          if (record.location) {
            return <>{record.location.name}</>
          } else {
            return <>-</>
          }
        }
      },
      {
        name: 'user',
        customRender: (record: IBreach) => {
          if (record.user) {
            return (
              <>
                {record.user.name} {record.user.lastName}
              </>
            )
          } else if (record.contact) {
            return (
              <>
                {record.contact.firstName} {record.contact.lastName}
              </>
            )
          } else {
            return <>-</>
          }
        }
      },
      {
        name: 'status',
        customRender: (record: IBreach) => {
          if (record.user) {
            if (record.user.banFinish) {
              return moment.tz('America/Guatemala').isAfter(record.user.banFinish) ? (
                <Tag color="green">{translations.active}</Tag>
              ) : (
                <Tag color="red">{translations.banned}</Tag>
              )
            } else {
              return <Tag color="green">{translations.active}</Tag>
            }
          } else if (record.contact) {
            if (record.contact.banFinish) {
              return moment.tz('America/Guatemala').isAfter(record.contact.banFinish) ? (
                <Tag color="green">{translations.active}</Tag>
              ) : (
                <Tag color="red">{translations.banned}</Tag>
              )
            } else {
              return <Tag color="green">{translations.active}</Tag>
            }
          } else {
            return <>-</>
          }
        }
      },
      {
        name: 'nativeLoc',
        customRender: (record: IBreach) => {
          if (record.user) {
            return record.user.nativeLocation ? <>{(record.user.nativeLocation as ILocation[]).map(e => e.abbreviation).join(' ,')}</> : <>-</>
          } else {
            return <>-</>
          }
        }
      }
    ],
    translate: translations,
    operations: operations,
    nonShowOperation: false
  })
}

export default columns
