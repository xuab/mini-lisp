import { library } from '../library'

test('first', async () => {
  expect(library.first([1, 2, 3])).toBe(1)
})