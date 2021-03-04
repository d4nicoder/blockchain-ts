import { IBlock } from "../../Block/Domain/Models/IBlock";
import { IBlockCriteria } from "../Domain/Models/IBlockCriteria";
import { IBlockchainRepository } from "../Domain/Models/IBlockchainRepository";
import BlockCriteria from "../Domain/ValueObjects/BlockCriteria";

export default class SearchBlocks {
  constructor(private repository: IBlockchainRepository) { }
  
  async searchBlocks(filter: IBlockCriteria): Promise<IBlock[]> {
    const criteria = new BlockCriteria(filter)
    return this.repository.get(criteria)
  }
}