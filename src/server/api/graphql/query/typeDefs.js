import query from './query.graphql';
import { typeDefs as hello } from '../hello';

export default `${query}\n${hello}\n`;
