import hello from './hello.graphql';
import resolvers from './resolvers';

console.log(`hello ${hello}`);
const typeDefs = `${hello}\n`;

export { typeDefs, resolvers };
