import Block from "../Domain/ValueObjects/Block"


describe('Block', () => {
  it('should generate the correct hash', () => {
    jest.spyOn(global.Date, 'now')
      .mockImplementationOnce(() => 1614880248673)
    const block = new Block(0, 'Everything starts here', '')
    expect(block.getBlock().hash).toEqual('d684e13af0895b46d1325dffab33fdbb2ca8ec7921a13c9e2171b60d0832d720')
  })

  it('should generate hash with matched difficulty', () => {
    jest.spyOn(global.Date, 'now')
      .mockImplementationOnce(() => 1614880248673)
    const block = new Block(0, 'Everything starts here', '')
    block.mine(2)
    expect(block.getBlock().hash.startsWith('00')).toBe(true)
  })

  it('should fail when negative index provided', () => {
    expect(() => {
      const block = new Block(-1, 'Everything starts here', '')
    }).toThrow()
  })

  it('should fail when index is not a number', () => {
    expect(() => {
      // @ts-ignore
      const block = new Block('1', 'Everything starts here', '')
    }).toThrow()
  })

  it('should return block data', () => {
    const message = 'Everything starts here'
    const previousHash = ''
    jest.spyOn(global.Date, 'now')
      .mockImplementationOnce(() => 1614880248673)
    const block = new Block(0, message, previousHash)
    const data = block.getBlock()

    expect(data.date).toBe(1614880248673)
    expect(data.data).toEqual(message)
    expect(data.previousHash).toEqual(previousHash)
    expect(data.hash).toEqual('d684e13af0895b46d1325dffab33fdbb2ca8ec7921a13c9e2171b60d0832d720')
    expect(data.index).toBe(0)
  })

  it('should thrown when previousHash is not a string', () => {
    expect(() => {
      // @ts-ignore
      const block = new Block(0, 'data', 123)
    }).toThrow()
  })
})