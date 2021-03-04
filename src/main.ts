import { SHA256 } from 'crypto-js'


class Block {
  private readonly hash: string

  private readonly date = new Date()

  private nonce: number = 0

  constructor(private index: number, private data: unknown, private previousHash: string = '') {
    this.hash = this.createHash()
  }

  getIndex() {
    return this.index
  }

  getHash() {
    return this.hash
  }

  createHash() {
    return SHA256(this.index.toString() + this.date + this.data + this.previousHash + this.nonce.toString()).toString()
  }

  mine(difficulty: string) {
    while (!this.hash.startsWith(difficulty)) {
      this.nonce++
      this.hash = this.createHash()
    }
  }
}

class BlockChain {
  private readonly chain: Block[]

  constructor(genesis: string, private difficulty = '00') {
    this.chain = [this.createFirstBlock(genesis)]
  }

  private createFirstBlock(data: string) {
    return new Block(0, data)
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(data: string) {
    const prevBlock = this.getLastBlock()
    const newBlock = new Block(prevBlock.getIndex() + 1, data, prevBlock.getHash())
    this.chain.push(newBlock)
  }
}


