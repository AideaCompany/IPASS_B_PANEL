import client from '@/graphql/config'
import { createInvitationEvent } from '@/graphql/invitationEvent/mutation/createInvitationEvent'
import { deleteInvitationEvent } from '@/graphql/invitationEvent/mutation/deleteInvitationEvent'
import { updateInvitationEvent } from '@/graphql/invitationEvent/mutation/updateInvitationEvent'
import { getInvitationEvent } from '@/graphql/invitationEvent/queries/getInvitationEvent'
import { listInvitationEventByEvent } from '@/graphql/invitationEvent/queries/listInvitationEventsByEvent'
import { InvitationEvent } from '@/types/types'
import { gql } from 'apollo-boost'

export const createInvitation = async (variables: InvitationEvent): Promise<InvitationEvent> => {
  return (await client.mutate({ mutation: gql(createInvitationEvent), variables: { input: variables } })).data.createInvitationEvent
}

export const getAllInvitationByEvent = async (_id: string): Promise<InvitationEvent[]> => {
  return (await client.query({ query: gql(listInvitationEventByEvent), variables: { _id } })).data.listInvitationEventByEvent
}

export const getinvitation = async (_id: string): Promise<InvitationEvent> => {
  return (await client.query({ query: gql(getInvitationEvent), variables: { _id } })).data.getInvitationEvent
}

export const updateInvitation = async (input: InvitationEvent): Promise<InvitationEvent> => {
  return (await client.mutate({ mutation: gql(updateInvitationEvent), variables: { input } })).data.updateInvitationEvent
}

export const deleteInvitation = async (_id: string): Promise<InvitationEvent> => {
  return (await client.mutate({ mutation: gql(deleteInvitationEvent), variables: { input: { _id } } })).data.deleteInvitationEvent
}
