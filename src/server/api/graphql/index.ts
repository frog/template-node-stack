import { lstatSync, readdirSync } from 'fs'
import { merge } from 'lodash'
import { join } from 'path'
import schema from './schema.graphql'

const listDirs = () => readdirSync(__dirname).filter((s: string) => lstatSync(join(__dirname, s)).isDirectory())
let typeDefs = `${schema}\n`
let resolvers = {}

listDirs().forEach((dir) => {
  const resource = require(`./${dir}`)
  typeDefs += `${resource.typeDefs}\n`
  resolvers = merge(resolvers, resource.resolvers)
})

export { typeDefs, resolvers }
