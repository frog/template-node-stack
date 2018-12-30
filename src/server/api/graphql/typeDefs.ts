import { typeDefs as query } from './query'
import schema from './schema.graphql'

export default `${schema}\n${query}\n`
