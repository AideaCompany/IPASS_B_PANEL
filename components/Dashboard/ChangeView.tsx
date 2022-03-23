import useSecurity from '@/providers/SecurityContext'
import { generateExcelSecurityFn, generatePDFSecurityFn } from '@/services/locations'
import { AppstoreOutlined, FileExcelFilled, FilePdfOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const ChangeView = () => {
  const { view, setView, selectedLocation } = useSecurity()
  const [inPage, setInPage] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    router.pathname.includes('dashboard') && setInPage(true)
    if (router.query.view) {
      setView(router.query.view as 'default')
    }
  }, [])

  const generateExcel = async () => {
    const res = await generateExcelSecurityFn(selectedLocation?._id as string)
    let a = document.createElement('a')
    a.style.display = 'none'
    a.href = `${process.env.NEXT_PUBLIC_BACK_FILES}/report/${res}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  const generatePDF = async () => {
    const res = await generatePDFSecurityFn(selectedLocation?._id as string)
    let a = document.createElement('a')
    a.style.display = 'none'
    a.href = `${process.env.NEXT_PUBLIC_BACK_FILES}/report/${res}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  return (
    <div className="changeViewContainer">
      <div className="changeView">
        {view === 'list' && (
          <>
            <Tooltip title="Generar excel">
              <FileExcelFilled className={`iconView selected`} onClick={generateExcel} />
            </Tooltip>
            <Tooltip title="Generar PDF">
              <FilePdfOutlined className={`iconView selected`} onClick={generatePDF} />
            </Tooltip>
          </>
        )}
      </div>
      <div className="changeView">
        <Tooltip title="Vista general">
          <AppstoreOutlined
            onClick={() =>
              inPage ? setView('default') : router.push({ pathname: '/[lang]/dashboard', query: { lang: router.query.lang, view: 'default' } })
            }
            className={`iconView ${view === 'default' && inPage && 'selected'}`}
          />
        </Tooltip>
        <div className="divisor" />
        <Tooltip title="Vista simplificada">
          <UnorderedListOutlined
            onClick={() =>
              inPage ? setView('list') : router.push({ pathname: '/[lang]/dashboard', query: { lang: router.query.lang, view: 'list' } })
            }
            className={`iconView ${view === 'list' && inPage && 'selected'}`}
          />
        </Tooltip>
      </div>
    </div>
  )
}

export default React.memo(ChangeView)
