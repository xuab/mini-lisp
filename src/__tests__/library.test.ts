import { library } from '../library'

test('first', async () => {
  expect(library.first([1, 2, 3])).toStrictEqual(1)
  expect(library.first([])).toStrictEqual(undefined)
})

test('rest', async () => {
  expect(library.rest([1, 2, 3])).toStrictEqual([2, 3])
  expect(library.rest([])).toStrictEqual([])
})