import * as pgp_lib from './pgp.js'

// test
pgp_lib.SearchKey('example@example.com').then((key) => {
  console.log(key)
}).catch((err) => {
  console.error(err)
})

