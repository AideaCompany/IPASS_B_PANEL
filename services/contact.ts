import client from '@/graphql/config'
import client2 from '../graphql2/config'
import { sendDataVerification } from '@/graphql/contact/mutations/sendDataVerification'
import { sendDataVerificationPDF } from '@/graphql/contact/mutations/sendDataVerificationPDF'
import { sendVerification as sendVerificationMutate } from '@/graphql/contact/mutations/sendVerification'
import { uploadMRZ } from '@/graphql/contact/mutations/uploadMRZ'
import { uploadPDF } from '@/graphql/contact/mutations/uploadPDF'
import { verifyPhoto } from '@/graphql/contact/mutations/verifyPhoto'
import { getContact } from '@/graphql/contact/queries/getContact'
import { listContact } from '@/graphql/contact/queries/listContact'
import { IContact, ReadedMRZ, ReadedPDF } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'
import { verifyContact } from '@/graphql/contact/mutations/verifyContant'
import { createContact } from '@/graphql/contact/mutations/createContact'
import { subListContact } from '@/graphql/contact/subscription/subListContact'
import { uploadPass } from 'graphql2/mutation'
import { sendDataVerificationPass } from '@/graphql/contact/mutations/sendDataVerificationPass'

export const getAllContactUser = async (): Promise<IContact[]> => {
  client.cache.reset()
  return convertTotable<IContact>(await (await client.query({ query: gql(listContact) })).data.listContact).reverse()
}

export const createContactFn = async (input: IContact): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(createContact), variables: { input } })).data.createContact
}

export const getContactbyId = async (_id: string): Promise<IContact> => {
  client.cache.reset()
  return (await client.query({ query: gql(getContact), variables: { _id } })).data.getContact
}

export const sendVerification = async (input: any, ID: string): Promise<IContact[]> => {
  return (await client.mutate({ mutation: gql(sendDataVerification), variables: { input, ID } })).data.sendDataVerification
}

export const sendVerificationPDF = async (input: any, ID: string): Promise<IContact[]> => {
  return (await client.mutate({ mutation: gql(sendDataVerificationPDF), variables: { input, ID } })).data.sendDataVerification
}

export const sendDataVerificationPassFn = async (input: any, ID: string): Promise<IContact[]> => {
  return (await client.mutate({ mutation: gql(sendDataVerificationPass), variables: { input, ID } })).data.sendDataVerificationPass
}

export const serVerificationMRZ = async (input: any): Promise<ReadedMRZ> => {
  return (await client2.mutate({ mutation: gql(uploadMRZ), variables: { input } })).data.uploadMRZ
}

export const serVerificationPass = async (input: any): Promise<ReadedMRZ> => {
  return (await client2.mutate({ mutation: gql(uploadPass), variables: { input } })).data.uploadPass
}

export const serVerificationPDF = async (input: any): Promise<ReadedPDF> => {
  return (await client2.mutate({ mutation: gql(uploadPDF), variables: { input } })).data.uploadPDF
}

export const serVerificationPhoto = async (input: any): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(verifyPhoto), variables: { input } })).data.verifyPhoto
}

export const resendVerification = async (contactID: string): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(sendVerificationMutate), variables: { contactID } })).data.sendVerification
}

export const verifyContactID = async (contactID: string): Promise<IContact> => {
  console.log(contactID)
  return (await client.mutate({ mutation: gql(verifyContact), variables: { contactID } })).data.updateContact
}

export const subscribeContactUser = async (after: (data: boolean) => void, hostID?: any): Promise<ZenObservable.Subscription> => {
  after(true)
  return client.subscribe({ query: gql(subListContact), variables: { hostID } }).subscribe({
    next(data) {
      after(data.data.subListContact)
    },
    error(err) {
      console.log('err', err)
    }
  })
}
