import { GraphQLResolveInfo } from 'graphql'
import * as _ from 'lodash'
import { Model } from 'sequelize'
import logger from 'utils/logger'
import defineModel from './note.model'

const API_HOST = 'https://api.pokemontcg.io/v1'

export default {
  Query: {
    noteFor: async (obj: any, args: any, context: any, info: GraphQLResolveInfo) => {
      logger.info('resolver::query.note')
      const userId = _.get(context, 'state.user.email')
      const parentCard = context.parentCard
      if (!userId) {
        // if (parentCard) return null
        throw new Error('Auhtentication Error')
      }
      const Note = await defineModel()
      return Note.findOne({ where: { userId, cardId: args.cardId } })
    }
  },
  Mutation: {
    upsertNote: async (obj: any, args: any, context: any, info: GraphQLResolveInfo) => {
      logger.info('resolver::mutation.upsertNote', args)
      const userId = _.get(context, 'state.user.email')
      if (!userId) {
        throw new Error('Auhtentication Error')
      }
      const Note = await defineModel()
      const found = await Note.findOne({ where: { userId, cardId: args.note.cardId } })
      if (found) {
        return found.update(args.note)
      } else { // insert
        return Note.create({ userId, ...args.note })
      }
    }
  }
}
