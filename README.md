# Mini Lisp

![Coverage](https://img.shields.io/codecov/c/github/xuab/mini-lisp?logo=jest)

A mini Lisp interpreter in TypeScript.

## Repl

```
$ npm start
```

## Examples

```lisp
(first (1 2 3))
```

```lisp
((lambda (x) (rest x)) (1 2 3))
```
