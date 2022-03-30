import client from '@/graphql/config'
import { createInvitationEvent } from '@/graphql/invitationEvent/mutation/createInvitationEvent'
import { deleteInvitationEvent } from '@/graphql/invitationEvent/mutation/deleteInvitationEvent'
import { updateInvitationEvent } from '@/graphql/invitationEvent/mutation/updateInvitationEvent'
import { getInvitationEvent } from '@/graphql/invitationEvent/queries/getInvitationEvent'
import { listInvitationEventByEvent } from '@/graphql/invitationEvent/queries/listInvitationEventsByEvent'
import { IInvitationEvent } from '@/types/interfaces/InvitationEvent/InvitationEvent.interface'

import { gql } from 'apollo-boost'

export const createInvitation = async (variables: IInvitationEvent): Promise<IInvitationEvent> => {
  return (await client.mutate({ mutation: gql(createInvitationEvent), variables: { input: variables } })).data
    .createInvitationEvent as IInvitationEvent
}

export const getAllInvitationByEvent = async (_id: string): Promise<IInvitationEvent[]> => {
  return (await client.query({ query: gql(listInvitationEventByEvent), variables: { _id } })).data.listInvitationEventByEvent as IInvitationEvent[]
}

export const getinvitation = async (_id: string): Promise<IInvitationEvent> => {
  return (await client.query({ query: gql(getInvitationEvent), variables: { _id } })).data.getInvitationEvent as IInvitationEvent
}

export const updateInvitation = async (input: IInvitationEvent): Promise<IInvitationEvent> => {
  return (await client.mutate({ mutation: gql(updateInvitationEvent), variables: { input } })).data.updateInvitationEvent as IInvitationEvent
}

export const deleteInvitation = async (_id: string): Promise<IInvitationEvent> => {
  return (await client.mutate({ mutation: gql(deleteInvitationEvent), variables: { input: { _id } } })).data.deleteInvitationEvent as IInvitationEvent
}
