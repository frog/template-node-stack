import schema from './schema.graphql';
import { typeDefs as query } from './query';

export default `${schema}\n${query}\n`;
