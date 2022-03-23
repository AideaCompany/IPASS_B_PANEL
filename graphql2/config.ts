import { ApolloClient, InMemoryCache, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { createUploadLink } from 'apollo-upload-client'
import Cookie from 'js-cookie'
var token = Cookie.get('authRenapPanel')
export const setToken = (tokenVal: string) => {
  token = tokenVal
}
const authLink = setContext((_: any, { headers }) => {
  return {
    /*  */
    headers: {
      headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = authLink.concat(
  createUploadLink({
    uri: process.env.NEXT_PUBLIC_URL2
  })
)

let myLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
      },
      new WebSocketLink({
        uri: process.env.NEXT_PUBLIC_WS2 as string,
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
