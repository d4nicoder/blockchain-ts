import SearchBlocks from "../Application/SearchBlocks"
import MockRepository from "./__mocks__/MockRepository"

describe('AddBlock', () => {
  it('should call get method from repository', async () => {
    const repository = new MockRepository({ getValue: [] })
    const searchBlocks = new SearchBlocks(repository)
    await searchBlocks.searchBlocks({})

    expect(repository.get).toBeCalledTimes(1)
  })
})