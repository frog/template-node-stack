import { typeDefs as hello } from '../hello'
import query from './query.graphql'

export default `${query}\n${hello}\n`
