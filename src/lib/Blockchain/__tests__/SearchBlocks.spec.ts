import { IBlock } from "../../Block/Domain/Models/IBlock"
import AddBlock from "../Application/AddBlock"
import SearchBlocks from "../Application/SearchBlocks"
import BlockCriteria from "../Domain/ValueObjects/BlockCriteria"
import MockRepository from "./__mocks__/MockRepository"

describe('AddBlock', () => {
  it('should call get method from repository', async () => {
    const repository = new MockRepository({ getValue: [] })
    const searchBlocks = new SearchBlocks(repository)
    await searchBlocks.searchBlocks({})

    expect(repository.get).toBeCalledTimes(1)
  })
})