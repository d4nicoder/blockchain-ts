import { IBlock } from "../../Block/Domain/Models/IBlock";
import Block from "../../Block/Domain/ValueObjects/Block";
import { IBlockchainRepository } from "../Domain/Models/IBlockchainRepository";
import BlockCriteria from "../Domain/ValueObjects/BlockCriteria";
import axios from 'axios'
// @ts-ignore
import httpAdapter from 'axios/lib/adapters/http.js'
export default class CouchDBRepository implements IBlockchainRepository {

  private readonly DATABASE = process.env.COUCH_DB_DATABASE

  constructor() { }

  private getHeaders() {
    const user = process.env.COUCH_DB_USER
    const pass = process.env.COUCH_DB_PASS
    let headers: any = {
      'Content-Type': 'application/json'
    }

    if (user && pass) {
      headers['Authorization'] = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`
    }
    return headers
  }

  private async query(url: string, method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE', body: string) {
    const buf = Buffer.from(body)
    const headers = { ...this.getHeaders(), ...{ 'Content-length': buf.length } }
    const port = process.env.COUCH_DB_PORT ? parseInt(process.env.COUCH_DB_PORT, 10) : 5984
    let uri = `${process.env.COUCH_DB_PROTOCOL}://${process.env.COUCH_DB_HOST}:${port}${url}`
    let res
    try {
      res = await axios.request({
        url: uri,
        method,
        headers,
        data: buf,
        adapter: httpAdapter
      })
    } catch (e) {
      console.error(e)
      throw e
    }
    return res.data
  }

  private async ensureDatabase(): Promise<void> {
    const dbs = await this.query('/_all_dbs', 'GET', '')
    const exists: boolean = dbs.reduce((accum: boolean, db: string) => {
      if (db === this.DATABASE) {
        accum = true
      }
      return accum
    }, false)

    if (!exists) {
      // Let's create the database
      const method = 'PUT'
      const url = `/${this.DATABASE}`
      await this.query(url, method, '')

      // Create indexes
      const indexMethod = 'POST'
      const indexUrl = `/${this.DATABASE}/_index`
      const indexBody = {
        index: {
          fields: [
            "index"
          ]
        },
        name: 'transaction-index',
        type: 'json'
      }

      await this.query(indexUrl, indexMethod, JSON.stringify(indexBody))

      const indexBody2 = {
        index: {
          fields: [
            "previousHash"
          ]
        },
        name: 'transaction-index',
        type: 'json'
      }

      await this.query(indexUrl, indexMethod, JSON.stringify(indexBody2))

      const indexBody3 = {
        index: {
          fields: [
            "hash"
          ]
        },
        name: 'hash-index',
        type: 'json'
      }

      await this.query(indexUrl, indexMethod, JSON.stringify(indexBody3))
    }
  }

  async get(criteria: BlockCriteria): Promise<IBlock[]> {
    await this.ensureDatabase()
    const filter = criteria.value()

    let query: any = { $and: [] }

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

    if (filter.hash) {
      query.$and.push({
        hash: filter.hash
      })
    }

    if (filter.previousHash) {
      query.$and.push({
        previousHash: filter.previousHash
      })
    }

    if (query.$and.length === 0) {
      query = {}
    }

    const queryObject = {
      selector: query,
      sort: [
        {
          index: "asc"
        }
      ]
    }

    const method = 'POST'
    const url = `/${this.DATABASE}/_find`

    const results = await this.query(url, method, JSON.stringify(queryObject))
    return results.docs
  }

  async getLast(): Promise<IBlock> {
    await this.ensureDatabase()
    const queryObject = {
      selector: {},
      sort: [
        {
          "index": "desc"
        }
      ],
      limit: 1
    }
    const method = 'POST'
    const url = `/${this.DATABASE}/_find`
    const { docs } = await this.query(url, method, JSON.stringify(queryObject))

    if (docs.length === 0) {
      throw new Error('Blockchain is empty')
    }
    return docs[0]
  }

  async addBlock(block: Block): Promise<void> {
    await this.ensureDatabase()
    const object = block.getBlock()
    const insert = {
      ...{ _id: object.hash },
      ...object
    }
    const url = `/${this.DATABASE}/${object.hash}`
    await this.query(url, 'PUT', JSON.stringify(insert))
  }

}