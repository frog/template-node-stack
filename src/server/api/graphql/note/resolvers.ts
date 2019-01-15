import { GraphQLResolveInfo } from 'graphql'
import logger from 'utils/logger'
import defineModel from './note.model'

const API_HOST = 'https://api.pokemontcg.io/v1'

export default {
  Query: {
    note: async (obj: any, args: any, context: any, info: GraphQLResolveInfo) => {
      logger.info('resolver::query.note', args)
      const model = defineModel()
      const record = (await model).findOne()
      return {
        id: 'fakenote',
        text: 'fakenote text text text'
      }
    }
  }
}
