import { IBlock } from "../../Block/Domain/Models/IBlock";
import Block from "../../Block/Domain/ValueObjects/Block";
import { IBlockchainRepository } from "../Domain/Models/IBlockchainRepository";
import BlockCriteria from "../Domain/ValueObjects/BlockCriteria";
const NodeCouchDB = require('node-couchdb')

export default class CouchDBRepository implements IBlockchainRepository {
  private readonly connection

  private readonly DATABASE = 'blockchain'

  constructor() {
    const port = process.env.COUCH_DB_PORT ? parseInt(process.env.COUCH_DB_PORT, 10) : 5984
    this.connection = new NodeCouchDB({
      host: process.env.COUCH_DB_HOST,
      protocol: process.env.COUCH_DB_PROTOCOL,
      port: port,
      auth: {
        user: process.env.COUCH_DB_USER,
        pass: process.env.COUCH_DB_PASS
      }
    })
  }

  async get(criteria: BlockCriteria): Promise<IBlock[]> {
    const filter = criteria.value()

    const query: any = { $and: [] }

    if (filter.date) {
      query.$and.push({
        date: {
          $gte: filter.date.from
        }
      })

      query.$and.push({
        date: {
          $lte: filter.date.to
        }
      })
    }

    if (filter.index) {
      query.$and.push({
        index: {
          $gte: filter.index.from
        }
      })

      query.$and.push({
        index: {
          $lte: filter.index.to
        }
      })
    }

    const queryObject = {
      selector: query,
      sort: [
        {
          index: "asc"
        }
      ]
    }

    const results = await this.connection.mango(this.DATABASE, queryObject, {})
    console.log(results)
    return results
  }

  async getLast(): Promise<IBlock> {
    const queryObject = {
      selector: {},
      sort: [
        {
          "index": "desc"
        }
      ],
      limit: 1
    }

    const { data: { docs } } = await this.connection.mango(this.DATABASE, queryObject, {})
    const result = docs[0]

    if (!result) {
      throw new Error('Blockchain is empty')
    }
    return result
  }

  async addBlock(block: Block): Promise<void> {
    const object = block.getBlock()
    const insert = {
      ...{ _id: object.hash },
      ...object
    }

    await this.connection.insert(this.DATABASE, insert)
  }

}