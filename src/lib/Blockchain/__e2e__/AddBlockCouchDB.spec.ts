import axios from 'axios'
// @ts-ignore
import httpAdapter from 'axios/lib/adapters/http.js'
import AddBlock from '../Application/AddBlock'
import SearchBlocks from '../Application/SearchBlocks'
import CouchDBRepository from '../Infrastructure/CouchDBRepository'

const purgeDatabase = async (): Promise<void> => {
  process.env.REPOSITORY = 'couchdb'
  process.env.COUCH_DB_HOST = 'localhost'
  process.env.COUCH_DB_PROTOCOL = 'http'
  process.env.COUCH_DB_PORT = '5984'
  process.env.COUCH_DB_DATABASE = 'blockchain-test'
  process.env.COUCH_DB_USER = 'admin'
  process.env.COUCH_DB_PASS = 'admin'
  const auth = `Basic ${Buffer.from('admin:admin').toString('base64')}`

  try {
    const res = await axios.get('http://localhost:5984/_all_dbs', {
      headers: {
        Accept: 'application/json',
        Authorization: auth
      },
      adapter: httpAdapter
    })
    if (res.data.indexOf(process.env.COUCH_DB_DATABASE) < 0) {
      return
    }
  } catch (e) {
    throw e
  }

  try {
    await axios.request({
      method: 'DELETE',
      url: `${process.env.COUCH_DB_PROTOCOL}://${process.env.COUCH_DB_HOST}:${process.env.COUCH_DB_PORT}/${process.env.COUCH_DB_DATABASE}`,
      headers: {
        'Accept': 'application/json',
        'Authorization': auth
      },
      adapter: httpAdapter
    })
  } catch (e) {
    console.error('Error deleting database')
    console.error(e.message)
  }
}

beforeEach(async () => {
  await purgeDatabase()
})

afterAll(async () => {
  // Delete database
  await purgeDatabase()
  process.env.REPOSITORY = 'local'
})

describe('AddBlock (CouchDB)', () => {
  it('should generate genesis block on first block', async () => {
    const repository = new CouchDBRepository()
    const addBlock = new AddBlock(repository)
    await addBlock.addBlock('First block')

    const searchBlocks = new SearchBlocks(repository)
    const totalBlocks = await searchBlocks.searchBlocks({})
    expect(totalBlocks[0].index).toBe(0)
    expect(totalBlocks[0].previousHash).toEqual('')
    expect(totalBlocks[0].data).toEqual('Everything starts here')
  })

  it('should generate first block', async () => {
    const repository = new CouchDBRepository()
    const addBlock = new AddBlock(repository)
    const data = 'First block'
    await addBlock.addBlock(data)

    const searchBlocks = new SearchBlocks(repository)
    const totalBlocks = await searchBlocks.searchBlocks({})
    expect(totalBlocks[1].index).toBe(1)
    expect(totalBlocks[1].previousHash).toEqual(totalBlocks[0].hash)
    expect(totalBlocks[1].data).toEqual(data)
  })

  it('should return only genesis block', async () => {
    const repository = new CouchDBRepository()
    const addBlock = new AddBlock(repository)
    const data = 'First block'
    await addBlock.addBlock(data)

    const searchBlocks = new SearchBlocks(repository)
    const filter = { index: { from: 0, to: 0 } }
    const totalBlocks = await searchBlocks.searchBlocks(filter)
    expect(totalBlocks.length).toBe(1)
    expect(totalBlocks[0].index).toBe(0)
    expect(totalBlocks[0].previousHash).toEqual('')
    expect(totalBlocks[0].data).toEqual('Everything starts here')
  })

  it('should return only first block', async () => {
    const repository = new CouchDBRepository()
    const addBlock = new AddBlock(repository)
    const data = 'First block'
    await addBlock.addBlock(data)

    const searchBlocks = new SearchBlocks(repository)
    const filter = { index: { from: 1, to: 1 } }
    const totalBlocks = await searchBlocks.searchBlocks(filter)
    expect(totalBlocks.length).toBe(1)
    expect(totalBlocks[0].index).toBe(1)
    expect(totalBlocks[0].data).toEqual(data)
  })
})