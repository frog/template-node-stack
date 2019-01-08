import { typeDefs as hello } from '../card'
import { typeDefs as card } from '../hello'
import query from './query.graphql'

export default `${query}\n${hello}\n${card}\n`
