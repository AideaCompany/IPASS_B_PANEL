/* eslint-disable @typescript-eslint/no-extra-semi */
import FormFactory from '@/components/crudFunctions/FormFactory'
import Main from '@/components/main'
import { Localization } from '@/i18n/types'
import { getLocalizationProps } from '@/providers/LenguageContext'
import { ThemeContext } from '@/providers/ThemeContext'
import {
  getContactbyId,
  sendDataVerificationPassFn,
  sendVerification,
  sendVerificationPDF,
  serVerificationMRZ,
  serVerificationPass,
  serVerificationPDF,
  serVerificationPhoto
} from '@/services/contact'
import { IInputSendDataVerification, IInputSendDataVerificationPDF } from '@/types/interfaces/Contact/MutationContact.interface'
import { ReadedMRZ, ReadedPDF } from '@/types/types'
import { Button, Form, FormInstance, message } from 'antd'
// import useWindowDimensions from 'hooks/useWindowDimensions'
//utils
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'

const Verification = (props: { localization: Localization }) => {
  const { localization } = props
  const router = useRouter()
  const formOne = useRef<FormInstance>(null)
  const [showMsg, setshowMsg] = useState<string>('Cargando porfavor espere...')
  const [showHint, setshowHint] = useState<boolean>(false)
  const [readedData, setreadedData] = useState<ReadedMRZ | ReadedPDF>()
  const [actualState, setactualState] = useState({ name: 'photo', title: 'Sube una foto tuya', photo: '/photo.png', step: 'Paso 1' })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [validImages, setvalidImages] = useState<any>({ photo: null, documentA: null, documentB: null })
  const [selectedMethod, setselectedMethod] = useState<'DPI' | 'License' | 'PASS' | null>(null)
  const [visibleHint, setvisibleHint] = useState('')
  const [registro, setRegistro] = useState(false)
  //provider
  const { theme } = useContext(ThemeContext)
  // const { width } = useWindowDimensions()
  //functions

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (router.query.id) {
        if (router.query.id !== 'test') {
          const actualContact = await getContactbyId(router.query.id as string)
          setRegistro(actualContact?.verificationRegistro)
          if (!actualContact) {
            setshowMsg('No se ha encontrado su invitación.')
          }
          if ((actualContact.verifiedData !== null || actualContact.verifiedDataPDF !== null) && !actualContact.verified) {
            setshowMsg('Estamos en proceso de verificar tu identidad.')
          }
          if ((actualContact.verifiedData !== null || actualContact.verifiedDataPDF !== null) && actualContact.verified) {
            setshowMsg('Ya eres verificado IPASS.')
          }
          if (actualContact.verifiedData === null && actualContact.verifiedDataPDF === null && !actualContact.verified) {
            setshowMsg('')
          }
        } else {
          setshowMsg('')
        }
      }
    })()
  }, [router.query])

  const sendAllData = async () => {
    const data1 = await formOne.current?.validateFields()
    // data1.photo = data1.photo
    // data1.documentA = data1.documentA
    if (selectedMethod === 'PASS') {
      data1.documentB = data1.documentPass
      delete data1.documentPass
    } else {
      // data1.documentB = data1.documentB
    }

    const toSend: IInputSendDataVerification | IInputSendDataVerificationPDF = { ...data1, ...readedData }

    if (router.query.id !== 'test') {
      if (selectedMethod === 'DPI') {
        await sendVerification(toSend as IInputSendDataVerification, router.query.id as string)
      } else if (selectedMethod === 'License') {
        await sendVerificationPDF(toSend as IInputSendDataVerificationPDF, router.query.id as string)
      } else {
        await sendDataVerificationPassFn(toSend as IInputSendDataVerification, router.query.id as string)
      }
    }
  }

  const verifyPhoto = async (photo: unknown): Promise<boolean> => {
    return await serVerificationPhoto({ photo })
  }

  // eslint-disable-next-line require-await
  const verifyMRZ = async (photo: unknown): Promise<ReadedMRZ> => {
    return new Promise(resolve => {
      serVerificationMRZ({ photo })
        .then(result => {
          resolve(result)
        })
        .catch(() => {
          resolve({ documentNumber: '' })
        })
    })
  }

  // eslint-disable-next-line require-await
  const verifyPASS = async (photo: unknown): Promise<ReadedMRZ> => {
    return new Promise(resolve => {
      serVerificationPass({ photo })
        .then(result => {
          resolve(result)
        })
        .catch(() => {
          resolve({ documentNumber: '' })
        })
    })
  }
  // eslint-disable-next-line require-await
  const verifyPDF = async (photo: unknown): Promise<ReadedPDF> => {
    return new Promise(resolve => {
      serVerificationPDF({ photo })
        .then(result => {
          resolve(result)
        })
        .catch(() => {
          resolve({ licNum: '' })
        })
    })
  }
  const verify = async (data: IInputSendDataVerification) => {
    message.loading({ key: 'info', content: 'Verificando', duration: 0 })
    if (actualState.name === 'photo') {
      if (registro) {
        setvalidImages({ ...validImages, photo: data.photo })
        if (selectedMethod === 'PASS') {
          setactualState({
            name: 'documentB',
            title: 'Sube la foto de tu pasaporte',
            photo: '/passport.png',
            step: 'Paso 2'
          })
        } else {
          setactualState({
            name: 'documentA',
            title: selectedMethod === 'DPI' ? 'DPI lado A' : 'Licencia lado A',
            photo: '/documentA.png',
            step: 'Paso 2'
          })
        }
        setshowHint(false)
        message.info({ key: 'info', content: 'Hemos verificado la foto con éxito' })
      } else {
        if (await verifyPhoto(data.photo)) {
          setvalidImages({ ...validImages, photo: data.photo })
          if (selectedMethod === 'PASS') {
            setactualState({
              name: 'documentB',
              title: 'Sube la foto de tu pasaporte',
              photo: '/passport.png',
              step: 'Paso 2'
            })
          } else {
            setactualState({
              name: 'documentA',
              title: selectedMethod === 'DPI' ? 'DPI lado A' : 'Licencia lado A',
              photo: '/documentA.png',
              step: 'Paso 2'
            })
          }
          setshowHint(false)
          message.info({ key: 'info', content: 'Hemos verificado la foto con éxito' })
        } else {
          setshowHint(true)
          getHint()
          message.info({ key: 'info', content: 'No hemos podido verificar la foto' })
        }
      }
    } else if (actualState.name === 'documentA') {
      if (registro) {
        setvalidImages({ ...validImages, documentA: data.documentA })
        message.info({ key: 'info', content: 'Hemos encontrado el lado A de tu documento' })
        setshowHint(false)
        getHint()
        setactualState({
          name: 'documentB',
          title: selectedMethod === 'DPI' ? 'DPI lado B' : 'Licencia lado B',
          photo: '/documentB.png',
          step: 'Paso 3'
        })
      } else {
        if (await verifyPhoto(data.documentA)) {
          setvalidImages({ ...validImages, documentA: data.documentA })
          message.info({ key: 'info', content: 'Hemos encontrado el lado A de tu documento' })
          setshowHint(false)
          getHint()

          setactualState({
            name: 'documentB',
            title: selectedMethod === 'DPI' ? 'DPI lado B' : 'Licencia lado B',
            photo: '/documentB.png',
            step: 'Paso 3'
          })
        } else {
          setshowHint(true)
          getHint()
          message.info({ key: 'info', content: 'No hemos podido encontrar el lado A de tu documento ' })
        }
      }
    } else if (actualState.name === 'documentB') {
      if (selectedMethod === 'DPI') {
        if (registro) {
          setshowHint(false)
          message.info({ key: 'info', content: 'Hemos encontrado el lado B de tu documento ' })
          setactualState({ name: 'all', title: 'Tus archivos', photo: '', step: '' })
        } else {
          const verifiedData = await verifyMRZ(data.documentB)
          if (verifiedData.documentNumber !== '') {
            setreadedData(verifiedData)
            setshowHint(false)
            message.info({ key: 'info', content: 'Hemos encontrado el lado B de tu documento ' })
            setactualState({ name: 'all', title: 'Tus archivos', photo: '', step: '' })
          } else {
            setshowHint(true)
            message.info({ key: 'info', content: 'No hemos podido encontrar el lado B de tu documento ' })
          }
        }
      } else if (selectedMethod === 'License') {
        if (registro) {
          setshowHint(false)
          message.info({ key: 'info', content: 'Hemos encontrado el lado B de tu licencia ' })
          setactualState({ name: 'all', title: 'Tus archivos', photo: '', step: '' })
        } else {
          const verifiedDataPDF = await verifyPDF(data.documentB)
          if (verifiedDataPDF.licNum !== '') {
            setreadedData(verifiedDataPDF)
            setshowHint(false)
            message.info({ key: 'info', content: 'Hemos encontrado el lado B de tu licencia ' })
            setactualState({ name: 'all', title: 'Tus archivos', photo: '', step: '' })
          } else {
            setshowHint(true)
            message.info({ key: 'info', content: 'No hemos podido encontrar el lado B de tu licencia ' })
          }
        }
      } else {
        if (registro) {
          setshowHint(false)
          message.info({ key: 'info', content: 'Hemos encontrado tu pasaporte' })
          setactualState({ name: 'all', title: 'Tus archivos', photo: '', step: '' })
        } else {
          const verifiedPass = await verifyPASS(data.documentPass)
          if (verifiedPass.documentNumber !== '') {
            setreadedData(verifiedPass)
            setshowHint(false)
            message.info({ key: 'info', content: 'Hemos encontrado tu pasaporte' })
            setactualState({ name: 'all', title: 'Tus archivos', photo: '', step: '' })
          } else {
            setshowHint(true)
            message.info({ key: 'info', content: 'No hemos podido encontrar tu pasaporte ' })
          }
        }
      }
    } else if (actualState.name === 'all') {
      await sendAllData()
      message.info({ key: 'info', content: 'Verificado' })
      if (router.query.id === 'test') {
        setactualState({ name: 'finish', title: 'Gracias por probar nuestra verificación', photo: '', step: '' })
      } else {
        setshowMsg('Gracias por verificarte, estaremos en contacto.')
      }
    }
    // else if (actualState.name === 'finish') {
    // }
  }

  const getHint = () => {
    const hints = [
      'Puedes mejorar la calidad de tu foto usando la linterna',
      'Por favor mejora la iluminación al máximo',
      'Evita usar el flash directo en la fotografía'
    ]
    const posibleHints = hints.filter(e => e !== visibleHint)
    setvisibleHint(posibleHints[Math.floor(Math.random() * posibleHints.length)])
  }

  return (
    <Main title={localization.translations.verification}>
      <div className="mainContainerPageVerification" style={{ overflow: 'auto' }}>
        {/* <div className="elementsProvider">
          <ChangeTheme />
          <LocaleSwitcher />
        </div> */}
        <div className={`containerForm ${actualState.name === 'all' || actualState.name === 'finish' ? 'all' : ''}`}>
          {showMsg === '' ? (
            <>
              {selectedMethod === null ? (
                <>
                  <div className="title noBorder">
                    <h2>Bienvenido al proceso de verificación IPASS</h2>

                    <h2>Selecciona método</h2>
                  </div>
                  <div className="buttons">
                    <Button onClick={() => setselectedMethod('DPI')} shape="round">
                      DPI
                    </Button>
                    <Button onClick={() => setselectedMethod('License')} shape="round">
                      Licencia de conducción
                    </Button>
                    <Button onClick={() => setselectedMethod('PASS')} shape="round">
                      Pasaporte
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="title">
                    {actualState.step !== '' && <h1>{actualState.step}</h1>} <p>{actualState.title}</p>
                  </div>
                  <div className="image">{actualState.photo !== '' && <img src={actualState.photo} />}</div>
                  {showHint && <h3>{visibleHint}</h3>}
                  <Form style={{ marginTop: '1em' }} ref={formOne} onFinish={verify}>
                    <div className="element">
                      {actualState.name === 'all' && <h1 style={{ borderRight: '2px solid #e46600', width: '40%' }}>{'Tu foto'}</h1>}
                      <FormFactory
                        translate={localization.translations}
                        theme={theme}
                        isUpdate={false}
                        formElements={[
                          {
                            name: 'photo',
                            type: 'avatar',
                            required: actualState.name === 'photo' || actualState.name === 'all' ? true : false,
                            fullWidth: true,
                            show: actualState.name === 'photo' || actualState.name === 'all' ? true : false
                          }
                        ]}
                      />
                    </div>
                    <div className="element">
                      {actualState.name === 'all' && selectedMethod !== 'PASS' && (
                        <h1 style={{ borderRight: '2px solid #e46600', width: '40%' }}>{'Lado A'}</h1>
                      )}
                      {selectedMethod !== 'PASS' && (
                        <FormFactory
                          translate={localization.translations}
                          theme={theme}
                          isUpdate={false}
                          formElements={[
                            {
                              name: 'documentA',
                              type: 'avatar',
                              required: actualState.name === 'documentA' || actualState.name === 'all' ? true : false,
                              fullWidth: true,
                              show: actualState.name === 'documentA' || actualState.name === 'all' ? true : false
                            }
                          ]}
                        />
                      )}
                    </div>
                    <div className="element">
                      {actualState.name === 'all' && (
                        <h1 style={{ borderRight: '2px solid #e46600', width: '40%' }}> {selectedMethod === 'PASS' ? 'Tu pasaporte' : 'Lado B'}</h1>
                      )}
                      <FormFactory
                        translate={localization.translations}
                        theme={theme}
                        isUpdate={false}
                        formElements={[
                          {
                            name: selectedMethod === 'PASS' ? 'documentPass' : 'documentB',
                            type: 'avatar',
                            required: actualState.name === 'documentB' || actualState.name === 'all' ? true : false,
                            fullWidth: true,
                            show: ['documentPass', 'documentB'].includes(actualState.name) || actualState.name === 'all' ? true : false
                          }
                        ]}
                      />
                    </div>
                    {actualState.name !== 'finish' && (
                      <Form.Item>
                        <Button shape="round" style={{ width: '100%', marginBottom: '1em' }} htmlType="submit" type={'primary'}>
                          {actualState.name === 'all' ? localization.translations.buttonVerifivation : 'Confirmar'}
                        </Button>
                      </Form.Item>
                    )}

                    {actualState.name === 'finish' && (
                      <Button shape="round" style={{ width: '100%', marginBottom: '1em' }} onClick={() => router.reload()} type={'primary'}>
                        Probar de nuevo
                      </Button>
                    )}
                  </Form>
                </>
              )}
            </>
          ) : (
            <h1>{showMsg}</h1>
          )}
        </div>
      </div>
    </Main>
  )
}

export default Verification

export const getStaticProps: GetStaticProps = ctx => {
  const localization = getLocalizationProps(ctx, 'verification')
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
