import React, { useEffect } from 'react'
import { NextRouter } from 'next/router'
import useAuth from '../../providers/AuthContext'

function ProtectRoute(props: { children: JSX.Element; router: NextRouter }): JSX.Element {
  const { loading, isAuthenticated, permission } = useAuth()
  const { children, router } = props
  useEffect(() => {
    if (!loading && permission.permissions) {
      if (router.pathname !== '/' && router.pathname !== '/[lang]' && router.pathname !== '/[lang]/session/signup_config') {
        if (!isAuthenticated && router.pathname !== '/[lang]/session' && router.pathname !== '/[lang]/session/signup_config') {
          router.push(`${router.query?.lang ? `/${router.query.lang}/session` : '/'}`)
        } else {
          if (
            ![
              '/[lang]/dashboard',
              '/[lang]/config',
              '/[lang]/verification',
              '/[lang]/confirmEvent',
              '/[lang]/diagramaLocation/[id]',
              '/[lang]/ourApps',
              '/device/[id]',
              '/404',
              '/certificados/mantenimiento',
              '/certificados/servidor',
              '/certificados/usuarios',
              '/certificados/registro',
              '/certificados/optimizaciones',
              '/certificados/propiedad'
            ].includes(router.pathname) &&
            !router.pathname.includes('session')
          ) {
            const actual = router.pathname.replace('/[lang]/', '').split('/')[0]
            //Para permisos
            if (!permission.permissions?.find(e => e.sectionName?.toLowerCase() === actual.toLocaleLowerCase())?.read) {
              console.log('19')
              router.push(`${router.query?.lang ? `/${router.query.lang}/dashboard` : '/'}`)
            }
          }
        }
      }
    }
  }, [loading])

  return !loading ? <>{children} </> : <></>
}

export default React.memo(ProtectRoute)
