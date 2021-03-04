import { IBlock } from "../../../Block/Domain/Models/IBlock";
import Block from "../../../Block/Domain/ValueObjects/Block";
import { IBlockchainRepository } from "../../Domain/Models/IBlockchainRepository";
import BlockCriteria from "../../Domain/ValueObjects/BlockCriteria";

type IMockConfig = {
  lastValue?: IBlock | undefined;
  getValue?: IBlock[] | undefined;
  addShouldFail?: boolean;
  getShouldFail?: boolean;
  lastShouldFail?: boolean;
}

export default class MockRepository implements IBlockchainRepository {

  constructor(private config: IMockConfig) {

  }

  get = jest.fn(async (criteria: BlockCriteria): Promise<IBlock[]> => {
    const filter = criteria.value()
    if (this.config.getShouldFail) {
      throw new Error('Error')
    }

    if (this.config.getValue) {
      return this.config.getValue
    } else {
      return []
    }
  })

  getLast = jest.fn(async (): Promise<IBlock> => {
    if (this.config.lastShouldFail) {
      throw new Error('Error')
    }
    if (this.config.lastValue) {
      return this.config.lastValue
    } else {
      throw new Error('Error missing genesis')
    }
  })

  addBlock = jest.fn(async (block: Block): Promise<void> => {
    const data = block.getBlock()
  })

}