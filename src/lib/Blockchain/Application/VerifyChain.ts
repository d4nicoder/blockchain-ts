import { IBlock } from "../../Block/Domain/Models/IBlock";
import { IBlockchainRepository } from "../Domain/Models/IBlockchainRepository";

export default class VerifyChain {
  constructor(private repository: IBlockchainRepository) { }

  async verify(blocks: IBlock[]): Promise<void> {
    
    let lastHash = ''
    for (let i = 0; i < blocks.length; i++) {
      const actual = blocks[i]
      if (actual.previousHash !== lastHash) {
        throw new Error(`Block ${i} is invalid`)
      }
      lastHash = actual.hash
    }
  }
}