import { IBlockCriteria } from "../Models/IBlockCriteria";

export default class BlockCriteria {
  private readonly criteria: IBlockCriteria = {}

  constructor(data: IBlockCriteria) {
    if (data.date && typeof data.date.from === 'number' && typeof data.date.to === 'number') {
      this.criteria.date = {
        from: data.date.from,
        to: data.date.to
      }
    }

    if (data.index && typeof data.index.from === 'number' && typeof data.index.to === 'number') {
      this.criteria.index = {
        from: data.index.from,
        to: data.index.to
      }
    }

    if (data.hash && typeof data.hash === 'string') {
      this.criteria.hash = data.hash
    }

    if (data.previousHash && typeof data.previousHash === 'string') {
      this.criteria.previousHash = data.previousHash
    }
  }

  value(): IBlockCriteria {
    return this.criteria
  }
}