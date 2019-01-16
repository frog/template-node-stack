import { GraphQLResolveInfo } from 'graphql'
import { Model } from 'sequelize'
import logger from 'utils/logger'
import defineModel from './note.model'

const API_HOST = 'https://api.pokemontcg.io/v1'

export default {
  Query: {
    noteFor: async (obj: any, args: any, context: any, info: GraphQLResolveInfo) => {
      logger.info('resolver::query.note', args)
      const Note = await defineModel()
      return Note.findOne({ where: { cardId: args.cardId } })
    }
  },
  Mutation: {
    upsertNote: async (obj: any, args: any, context: any, info: GraphQLResolveInfo) => {
      logger.info('resolver::mutation.upsertNote', args)
      const Note = await defineModel()
      const found = await Note.findOne({ where: { cardId: args.note.cardId } })
      if (found) {
        return found.update(args.note)
      } else { // insert
        return Note.create(args.note)
      }
    }
  }
}
