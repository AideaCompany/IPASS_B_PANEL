import FormFactory from '@/components/crudFunctions/FormFactory'
import MainLayout from '@/components/layout/Layout'
import { formElements } from '@/components/products/formElements'
import { Localization } from '@/i18n/types'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { ThemeContext } from '@/providers/ThemeContext'
import { getAllBrands } from '@/services/brands'
import { listAllServicesFn } from '@/services/services'
import { IBrands } from '@/types/interfaces/Brands/Brands.interface'
import { IService } from '@/types/types'
import { GetServerSidePropsContext } from 'next'
import React, { useContext } from 'react'

const create = ({ localization, lang, services, brands }: { localization: Localization; lang: string; services: IService[]; brands: IBrands[] }) => {
  //states
  // const [actualPermission, setActualPermission] = useState<IPermissionsPrivilege>()
  //providers
  // const { permission } = useAuth()

  const { theme } = useContext(ThemeContext)

  // useEffect(() => {
  //   setActualPermission(permission.permissions?.find(e => e.sectionName === 'Products'))
  // }, [permission])

  return (
    <MainLayout hideButtons lang={lang} title={localization.translations.titleModalCreate}>
      <div className="container_create_location flex">
        <div className="containerForms">
          <div className="elementsContainer">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <FormFactory formElements={formElements(services, brands)} isUpdate={false} translate={localization.translations} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default create

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const localization = getLocalizationProps(ctx, 'products')
  const services = await listAllServicesFn()
  const brands = await getAllBrands()
  return { props: { localization, services, brands } }
}
