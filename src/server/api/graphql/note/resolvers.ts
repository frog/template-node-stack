import { GraphQLResolveInfo } from 'graphql'
import fetch from 'node-fetch'
import logger from 'utils/logger'

const API_HOST = 'https://api.pokemontcg.io/v1'

export default {
  Query: {
    note: (obj: any, args: any, context: any, info: GraphQLResolveInfo) => {
      logger.info('resolver::query.note', args)
      return {
        id: 'fakenote',
        text: 'fakenote text text text'
      }
    }
  }
}
