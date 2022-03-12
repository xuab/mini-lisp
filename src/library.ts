export const library = {
  first: <T>(x: Array<T>) => x[0],
  rest: <T>(x: Array<T>) => x.slice(1),
}