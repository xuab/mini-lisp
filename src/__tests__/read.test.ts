import { read } from '../read'

test('should lex a single atom', () => {
  expect(read('a')).toStrictEqual({ type: 'identifier', value: 'a' })
})

test('should lex an atom in a list', () => {
  expect(read('()')).toStrictEqual([])
})

test('should lex multi atom list', () => {
  expect(read('(a b)')).toStrictEqual([
    {
      type: 'identifier',
      value: 'a',
    },
    {
      type: 'identifier',
      value: 'b',
    },
  ])
})
