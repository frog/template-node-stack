declare const requester
declare const nock
declare const chai

const a: string = 'franco'
import assert from 'assert'
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', async () => {
      for (let i = 0; i < 10000; i++) {
        assert.equal([1, 2, 3].indexOf(4), -1)
      }

      const response = await requester.get('/')
      console.log('respo', response)
    })
  })
})
