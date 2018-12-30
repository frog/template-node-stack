import logger from 'utils/logger'
import hello from './hello.graphql'
import resolvers from './resolvers'

logger.info(`hello ${hello}`)
const typeDefs = `${hello}\n`

export { typeDefs, resolvers }
