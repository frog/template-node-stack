import { GraphQLResolveInfo } from 'graphql'
import { delegateToSchema } from 'graphql-tools'
import fetch from 'node-fetch'

const API_HOST = 'https://api.pokemontcg.io/v1'

export default {
  Card: {
    set: (obj: any, args: any, context: any, info: GraphQLResolveInfo) => {
      return delegateToSchema({
        schema: info.schema,
        operation: 'query',
        fieldName: 'set',
        args: {
          id: obj.setCode
        },
        context, info
      })
    }
  },
  Query: {
    card: (obj: any, args: any, context: any, info: GraphQLResolveInfo) =>
      fetch(`${API_HOST}/cards/${args.id}`)
        .then((res: any) => res.json())
        .then((json: any) => json.card)
  }
}
