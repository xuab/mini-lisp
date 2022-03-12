import repl from 'repl'
import { read } from './read'
import { evaluate } from './evaluate'

repl.start({
  prompt: '> ',
  eval: (cmd, context, filename, callback) =>
    callback(null, evaluate(read(cmd))),
})
