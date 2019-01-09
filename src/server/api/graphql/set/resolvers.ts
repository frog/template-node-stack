import { GraphQLResolveInfo } from 'graphql'
import fetch from 'node-fetch'
import logger from 'utils/logger'

const API_HOST = 'https://api.pokemontcg.io/v1'

export default {
  Query: {
    set: (obj: any, args: any, context: any, info: GraphQLResolveInfo) => {
      logger.info('resolver::query.set', args)
      return fetch(`${API_HOST}/sets/${args.id}`)
        .then((res: any) => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error('Couldn\'t fetch resource, ' + res.text())
          }
        })
        .then((json: any) => json.set)
    }
  }
}
