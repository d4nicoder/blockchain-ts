import path from 'path'
import fsExtra from 'fs-extra'
import FileRepository from "../Infrastructure/FileRepository"
import AddBlock from '../Application/AddBlock'
import SearchBlocks from '../Application/SearchBlocks'

process.env.REPOSITORY = 'local'

const dbDir = path.resolve(path.join(__dirname, '..', '..', '..', '..', 'database'))

beforeEach(async () => {
  await fsExtra.remove(dbDir)
})

afterEach(async () => {
  await fsExtra.remove(dbDir)
})

describe('AddBlock', () => {
  it('should generate genesis block on first block', async () => {
    const repository = new FileRepository()
    const addBlock = new AddBlock(repository)
    await addBlock.addBlock('First block')

    const searchBlocks = new SearchBlocks(repository)
    const totalBlocks = await searchBlocks.searchBlocks({})
    expect(totalBlocks[0].index).toBe(0)
    expect(totalBlocks[0].previousHash).toEqual('')
    expect(totalBlocks[0].data).toEqual('Everything starts here')
  })

  it('should generate first block', async () => {
    const repository = new FileRepository()
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
    const repository = new FileRepository()
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
    const repository = new FileRepository()
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