import { GraphQLResolveInfo } from 'graphql'
import { delegateToSchema } from 'graphql-tools'
import fetch, { Response } from 'node-fetch'
import logger from 'utils/logger'

const API_HOST = 'https://api.pokemontcg.io/v1'
const PAGE_SIZE = 1000

export default {
  Card: {
    set: (obj: any, args: any, context: any, info: GraphQLResolveInfo) => {
      return delegateToSchema({
        schema: info.schema,
        operation: 'query',
        fieldName: 'set',
        args: {
          id: obj.setCode
        },
        context, info
      })
    },
    note: (obj: any, args: any, context: any, info: GraphQLResolveInfo) => {
      return delegateToSchema({
        schema: info.schema,
        operation: 'query',
        fieldName: 'noteFor',
        args: {
          cardId: obj.id
        },
        context, info
      })
    }
  },
  Query: {
    card: (obj: any, args: any, context: any, info: GraphQLResolveInfo) =>

      fetch(`${API_HOST}/cards/${encodeURIComponent(args.id)}`)
        .then((res: any) => res.json())
        .then((json: any) => json.card),

    cards: async (obj: any, args: any, context: any, info: GraphQLResolveInfo) => {
      const start = ((fromArgs: string) => {
        if (fromArgs) {
          return parseInt(Buffer.from(fromArgs, 'base64').toString(), 10)
        } else {
          return 1
        }
      })(args.start)
      const url = `${API_HOST}/cards?page=${start}&pageSize=${PAGE_SIZE}`
      logger.debug(`Fetching URL ${url}`)
      const res: Response = await fetch(url)
      const totalCount = parseInt(res.headers.get('total-count') as string, 10)
      // const count = parseInt(res.headers.get('count') as string, 10)
      logger.info('resolver::query.cards -> headers', res.headers.raw())
      const json: any = await res.json()
      let next = null
      if (start * PAGE_SIZE < totalCount) {
        next = Buffer.from((start + 1).toString()).toString('base64')
      }
      return {
        totalCount,
        values: json.cards,
        next
      }
    }
  }
}
