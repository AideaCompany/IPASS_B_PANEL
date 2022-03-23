import axios from 'axios'

export const getQr = async (clientID: string): Promise<{ status: string; message: string; code: string }> => {
  return (
    await axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_IPASS_URL}/getqr`,
      data: {
        clientID
      }
    })
  ).data
}

export const verifyQrStatus = async (
  code: string
): Promise<{ status: string; message: string; user: { email: string; name: string; lastName: string }; token: string; isWorker: boolean }> => {
  return (
    await axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_IPASS_URL}/verifystatus`,
      data: {
        code
      }
    })
  ).data
}
