import { library } from './library'
import { Atom, Atoms, Context, Scope, Value, Function } from './types'

const get = (id: string, ctx: Context): Function | Value | undefined => {
  if (id in ctx.scope)
    return ctx.scope[id]
  if (ctx.parent !== undefined)
    return get(id, ctx.parent)
}

const createContext = (scope: Scope, parent?: Context) => ({ scope, parent })

const special = {
  let: (input: Array<Atoms>, context: Context): Value | Function => {
    const letContext = (input[1] as Array<Array<Atom>>).reduce((acc, x) => {
      acc.scope[x[0].value] = evaluate(x[1], context)
      return acc
    }, createContext({}, context))

    return evaluate(input[2], letContext)
  },

  lambda:
    (input: Array<Atoms>, context: Context) =>
    (...args: Array<Value>): Value | Function => {
      const lambdaArguments = args
      const lambdaScope = (input[1] as Array<Atom>).reduce<Scope>((acc, x, i) => {
        acc[x.value] = lambdaArguments[i]
        return acc
      }, {})

      return evaluate(input[2], createContext(lambdaScope, context))
    },

  if: (input: Array<Atoms>, context: Context) =>
    evaluate(input[1], context)
      ? evaluate(input[2], context)
      : evaluate(input[3], context),
}

type SpecialKey = keyof typeof special
const isSpecialKey = (key: string | number): key is SpecialKey => (key as SpecialKey) in special

const evaluateList = (input: Array<Atoms>, context: Context) => {
  if (input.length > 0 && !Array.isArray(input[0])) {
    const key = input[0].value
    if (isSpecialKey(key))
      return special[key](input, context)
  }
  const list = input.map((x) => evaluate(x, context))
  return typeof list[0] === 'function'
    ? list[0].apply(undefined, list.slice(1) as any)
    : list
}

export const evaluate = (input: Atoms, context: Context = createContext(library)): Function | Value | undefined => {
  if (Array.isArray(input))
    return evaluateList(input, context) as Function | Value | undefined
  if (input.type === 'identifier')
    return get(input.value, context)
  if (input.type === 'number' || input.type === 'string')
    return input.value
}