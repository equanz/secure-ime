import * as pgp_lib from './pgp.js'

pgp_lib.SearchKey('equanz324@gmail.com').then((key) => {
  console.log(key)
}).catch((err) => {
  console.error(err)
})

