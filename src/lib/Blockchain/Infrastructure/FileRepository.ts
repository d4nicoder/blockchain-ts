import path from 'path'
import fs from 'fs'
import { IBlock } from "../../Block/Domain/Models/IBlock";
import { IBlockchainRepository } from "../Domain/Models/IBlockchainRepository";
import BlockCriteria from "../Domain/ValueObjects/BlockCriteria";
import Block from '../../Block/Domain/ValueObjects/Block';

export default class FileRepository implements IBlockchainRepository {

  private filename = path.resolve(path.join(__dirname, '..', '..', '..', '..', 'database', 'blockchain.json'))


  private async ensureDir(): Promise<void> {
    let exists = false

    try {
      const stat = await fs.promises.stat(path.dirname(this.filename))
      exists = stat.isDirectory()
    } catch (e) {
      console.log('Database not exists, creating it')
    }

    if (!exists) {
      await fs.promises.mkdir(path.dirname(this.filename), { recursive: true })
      await fs.promises.writeFile(this.filename, '{"blockchain": []}', { encoding: 'utf-8' })
    }
  }

  private async readAll(): Promise<IBlock[]> {
    // Read json file
    const data = await fs.promises.readFile(this.filename, { encoding: 'utf-8' })
    const content = JSON.parse(data.toString())
    return content.blockchain
  }

  async get(criteria: BlockCriteria): Promise<IBlock[]> {
    await this.ensureDir()

    const blockchain = await this.readAll()

    const filter = criteria.value()

    if (!filter.date && !filter.index) {
      return blockchain
    }

    return blockchain.filter((block) => {
      if (filter.date) {
        if (block.date < filter.date.from || block.date > filter.date.to) {
          return false
        }
      }
      if (filter.index) {
        if (block.index < filter.index.from || block.index > filter.index.to) {
          return false
        }
      }

      if (filter.hash && block.hash !== filter.hash) {
        return false
      }

      if (filter.previousHash && block.previousHash !== filter.previousHash) {
        return false
      }
      return true
    })
  }

  async getLast(): Promise<IBlock> {
    await this.ensureDir()
    const blockchain = await this.readAll()
    if (blockchain.length === 0) {
      throw new Error('Blockchain is empty')
    }

    return blockchain[blockchain.length - 1]
  }

  async addBlock(block: Block): Promise<void> {
    await this.ensureDir()

    const blockchain = await this.readAll()
    blockchain.push(block.getBlock())
    const content = {
      blockchain
    }

    await fs.promises.writeFile(this.filename, JSON.stringify(content, null, 2), { encoding: 'utf-8' })
  }


}