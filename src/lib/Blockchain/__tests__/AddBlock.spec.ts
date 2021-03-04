import { IBlock } from "../../Block/Domain/Models/IBlock"
import AddBlock from "../Application/AddBlock"
import MockRepository from "./__mocks__/MockRepository"

describe('AddBlock', () => {
  it('should create genesis block when no last block present', async () => {
    const repository = new MockRepository({ lastShouldFail: true })
    const addBlock = new AddBlock(repository)
    await addBlock.addBlock('data')
    expect(repository.addBlock).toBeCalledTimes(2)
  })
  it('should not create genesis block when last block present', async () => {
    const last: IBlock = {
      data: '',
      date: 123,
      hash: '123412',
      index: 0,
      nonce: 0,
      previousHash: ''
    }
    const repository = new MockRepository({ lastValue: last })
    const addBlock = new AddBlock(repository)
    await addBlock.addBlock('data')
    expect(repository.addBlock).toBeCalledTimes(1)
  })
})