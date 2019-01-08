import logger from 'utils/logger'
import cardById from './card.graphql'
import resolvers from './resolvers'

logger.info(`hello ${cardById}`)
const typeDefs = `${cardById}\n`

export { typeDefs, resolvers }
