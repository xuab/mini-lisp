import { Atom, Atoms } from './types'

const categorize = (input: string): Atom  => {
  if (!isNaN(parseFloat(input)))
    return { type: 'number', value: parseFloat(input) }
  if (input[0] === '"' && input.slice(-1) === '"')
    return { type: 'string', value: input.slice(1, -1) }
  return { type: 'identifier', value: input }
}

const parenthesize = (input:  Array<string>, list: Array<Atoms> = []): Atoms => {
  const token = input.shift()
  if (token === undefined)
    return list.pop() ?? []
  if (token === '(')
    return parenthesize(input, [...list, parenthesize(input, [])])
  if (token === ')')
    return list
  return parenthesize(input, list.concat(categorize(token)))
}

const tokenize = (input: string): Array<string> =>
  input
    .split('"')
    .map((x, i) =>
      i % 2 === 0
        ? x.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ')
        : x.replace(/ /g, '!whitespace!'),
    )
    .join('"')
    .trim()
    .split(/\s+/)
    .map((x) => x.replace(/!whitespace!/g, ' '))

export const read = (input: string): Atoms => parenthesize(tokenize(input))
