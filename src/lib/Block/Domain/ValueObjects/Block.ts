import { SHA256 } from 'crypto-js'
import { IBlock } from '../Models/IBlock'


export default class Block {
  private readonly date: number = Date.now()

  private readonly data: string

  private readonly previousHash: string

  private readonly index: number

  private hash: string

  private nonce: number = 0

  constructor(index: number, data: string, previousHash: string = '') {
    if (typeof index !== 'number' || index < 0) {
      throw new Error('Index should be greater or equal to zero')
    }

    if (typeof previousHash !== 'string') {
      throw new Error('Previous hash must to be a string')
    }
    this.index = index
    this.data = data
    this.previousHash = previousHash
    this.hash = this.createHash()
  }

  getBlock(): IBlock {
    return {
      index: this.index,
      date: this.date,
      data: this.data,
      previousHash: this.previousHash,
      nonce: this.nonce,
      hash: this.hash
    }
  }

  private createHash(): string {
    return SHA256(this.index.toString() + this.date.toString() + this.data + this.previousHash + this.nonce.toString()).toString()
  }

  mine(difficulty: number): void {
    const startString = Array(difficulty).fill('0').join('')
    const startTime = Date.now()

    while (!this.hash.startsWith(startString)) {
      this.nonce++
      this.hash = this.createHash()
    }

    //console.log(`Block mined. Time elapsed: ${Date.now() - startTime} ms. Iterations: ${this.nonce}`)
  }
}