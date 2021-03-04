import Block from "../../Block/Domain/ValueObjects/Block";
import { IBlockchainRepository } from "../Domain/Models/IBlockchainRepository";

export default class AddBlock {
  constructor(private repository: IBlockchainRepository) { }
  
  async addBlock(data: string): Promise<void> {
    let last
    try {
      last = await this.repository.getLast()
    } catch (e) {
      // First block, we have to generate genesis block
    }

    if (!last) {
      console.log('Creating genesis')
      const genesis = new Block(0, 'Everything starts here', '')
      await this.repository.addBlock(genesis)
      last = genesis.getBlock()
    }

    const newBlock = new Block(last.index + 1, data, last.hash)
    newBlock.mine(0)
    await this.repository.addBlock(newBlock)
  }
}