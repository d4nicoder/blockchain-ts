import BlockCriteria from "../Domain/ValueObjects/BlockCriteria"

describe('BlockCriteria', () => {
  it('should return and empty object', () => {
    const criteria = new BlockCriteria({})
    expect(criteria.value()).toEqual({})
  })

  it('should return empty date when missing to parameter', () => {
    const data = {
      date: {
        from: 1234
      }
    }
    // @ts-ignore
    const criteria = new BlockCriteria(data)
    expect(criteria.value()).toEqual({})
  })

  it('should return empty date when missing from parameter', () => {
    const data = {
      date: {
        to: 1234
      }
    }
    // @ts-ignore
    const criteria = new BlockCriteria(data)
    expect(criteria.value()).toEqual({})
  })

  it('should return empty index when missing from', () => {
    const data = {
      index: {
        to: 1
      }
    }
    // @ts-ignore
    const criteria = new BlockCriteria(data)
    expect(criteria.value()).toEqual({})
  })

  it('should return empty index when missing to', () => {
    const data = {
      index: {
        from: 1
      }
    }
    // @ts-ignore
    const criteria = new BlockCriteria(data)
    expect(criteria.value()).toEqual({})
  })

  it('should return correct date on criteria object', () => {
    const data = {
      date: {
        from: 1,
        to: 2
      }
    }
    const criteria = new BlockCriteria(data)
    expect(criteria.value()).toEqual({ date: { from: 1, to: 2 } })
  })

  it('should return correct index on criteria object', () => {
    const data = {
      index: {
        from: 1,
        to: 2
      }
    }
    const criteria = new BlockCriteria(data)
    expect(criteria.value()).toEqual({ index: { from: 1, to: 2 } })
  })

  it('should return correct hash on criteria object', () => {
    const hash = 'sampleHash'
    const data = {
      hash
    }
    const criteria = new BlockCriteria(data)
    expect(criteria.value()).toEqual({ hash })
  })

  it('should return correct previousHash on criteria object', () => {
    const previousHash = 'sampleHash'
    const data = {
      previousHash
    }
    const criteria = new BlockCriteria(data)
    expect(criteria.value()).toEqual({ previousHash })
  })
})