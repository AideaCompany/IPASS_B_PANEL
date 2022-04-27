/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApolloClient, InMemoryCache, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { createUploadLink } from 'apollo-upload-client'
import Cookie from 'js-cookie'
let token = Cookie.get('authRenapPanel')

export const setToken = (tokenVal: string) => {
  token = tokenVal
}
const authLink = setContext((_: unknown, { headers }) => {
  return {
    /*  */
    headers: {
      headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = authLink.concat(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  createUploadLink({
    uri: process.env.NEXT_PUBLIC_URL
  })
)

const myLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
      },
      new WebSocketLink({
        uri: process.env.NEXT_PUBLIC_WS as string,
        options: {
          reconnect: true,
          connectionParams: {
            Authorization: token ? `${token}` : ''
          }
        }
      }),
      httpLink
    )
  : httpLink

const client = new ApolloClient({
  cache: new InMemoryCache({ addTypename: false }),
  ssrMode: typeof window === 'undefined',
  link: myLink
})

export default client
