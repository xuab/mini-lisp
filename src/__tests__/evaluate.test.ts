import { read } from '../read'
import { evaluate } from '../evaluate'

test('should return empty list', () => {
  expect(evaluate(read('()'))).toStrictEqual([])
})

test('should return list of numbers in strings as strings', () => {
  expect(evaluate(read('("1" "2" "3")'))).toStrictEqual(['1', '2', '3'])
})

test('should return string atom', () => {
  expect(evaluate(read('"a"'))).toStrictEqual('a')
})

test('should return number atom', () => {
  expect(evaluate(read('123'))).toStrictEqual(123)
})

test('should return correct result when invoke lambda w no params', () => {
  expect(evaluate(read('((lambda () (rest (1 2))))'))).toStrictEqual([2])
})

test('should choose the right branch', () => {
  expect(evaluate(read('(if 1 42 4711)'))).toStrictEqual(42)
  expect(evaluate(read('(if 0 42 4711)'))).toStrictEqual(4711)
})
