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
import { ReadedMRZ, ReadedPDF } from '@/types/types'
import { convertTotable } from '@/utils/utils'
import gql from 'graphql-tag'
import { verifyContact } from '@/graphql/contact/mutations/verifyContant'
import { createContact } from '@/graphql/contact/mutations/createContact'
import { subListContact } from '@/graphql/contact/subscription/subListContact'
import { uploadPass } from 'graphql2/mutation'
import { sendDataVerificationPass } from '@/graphql/contact/mutations/sendDataVerificationPass'
import { IContact } from '@/types/interfaces/Contact/Contact.interface'
import { IInputSendDataVerification, IInputSendDataVerificationPDF } from '@/types/interfaces/Contact/MutationContact.interface'

export const getAllContactUser = async (): Promise<IContact[]> => {
  client.cache.reset()
  return convertTotable<IContact>((await (await client.query({ query: gql(listContact) })).data.listContact) as IContact[]).reverse()
}

export const createContactFn = async (input: IContact): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(createContact), variables: { input } })).data.createContact as IContact
}

export const getContactbyId = async (_id: string): Promise<IContact> => {
  client.cache.reset()
  return (await client.query({ query: gql(getContact), variables: { _id } })).data.getContact as IContact
}

export const sendVerification = async (input: IInputSendDataVerification, ID: string): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(sendDataVerification), variables: { input, ID } })).data.sendDataVerification as IContact
}

export const sendVerificationPDF = async (input: IInputSendDataVerificationPDF, ID: string): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(sendDataVerificationPDF), variables: { input, ID } })).data.sendDataVerification as IContact
}

export const sendDataVerificationPassFn = async (input: IInputSendDataVerification, ID: string): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(sendDataVerificationPass), variables: { input, ID } })).data.sendDataVerificationPass as IContact
}

export const serVerificationMRZ = async (input: { photo: unknown }): Promise<ReadedMRZ> => {
  return (await client2.mutate({ mutation: gql(uploadMRZ), variables: { input } })).data.uploadMRZ as ReadedMRZ
}

export const serVerificationPass = async (input: { photo: unknown }): Promise<ReadedMRZ> => {
  return (await client2.mutate({ mutation: gql(uploadPass), variables: { input } })).data.uploadPass as ReadedMRZ
}

export const serVerificationPDF = async (input: { photo: unknown }): Promise<ReadedPDF> => {
  return (await client2.mutate({ mutation: gql(uploadPDF), variables: { input } })).data.uploadPDF as ReadedPDF
}

export const serVerificationPhoto = async (input: { photo: unknown }): Promise<boolean> => {
  return (await client.mutate({ mutation: gql(verifyPhoto), variables: { input } })).data.verifyPhoto as boolean
}

export const resendVerification = async (contactID: string): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(sendVerificationMutate), variables: { contactID } })).data.sendVerification as IContact
}

export const verifyContactID = async (contactID: string): Promise<IContact> => {
  return (await client.mutate({ mutation: gql(verifyContact), variables: { contactID } })).data.updateContact as IContact
}

export const subscribeContactUser = (after: (data: boolean) => void, hostID?: string): ZenObservable.Subscription => {
  after(true)
  return client.subscribe({ query: gql(subListContact), variables: { hostID } }).subscribe({
    next(data) {
      after(data.data.subListContact as boolean)
    },
    error(err) {
      throw new Error(String(err))
    }
  })
}
