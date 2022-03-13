# Mini Lisp

![Coverage](https://img.shields.io/codecov/c/github/xuab/mini-lisp?logo=jest)
[![Tests][workflow-badge]](https://github.com/xuab/mini-lisp/actions/workflows/test.yml)

<!-- prettier-ignore-start -->
[workflow-badge]: https://img.shields.io/github/workflow/status/xuab/mini-lisp/test.svg?label=tests&logo=github&style=flat
<!-- prettier-ignore-end -->

A mini Lisp interpreter in TypeScript.

## REPL

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
