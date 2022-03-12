import { library } from './library'

export type Atom =
  | { type: 'number'; value: number }
  | { type: 'string'; value: string }
  | { type: 'identifier'; value: string }

export type Atoms = Atom | Array<Atoms>

export type Library = typeof library

export type Function = typeof library[keyof Library]

export type Value = number | string | undefined | Array<Value>

export type Scope = Record<string, Function | Value>

export type Context = {
  scope: Scope,
  parent?: Context
}