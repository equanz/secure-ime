let pubkey,privkey
pgp_lib.MakeKey('example','example@email.com',256).then(function(keys) {
  pubkey = keys.pubkey
  privkey = keys.privkey
  return pgp_lib.Encrypt('Hello world!',pubkey)
}).then(function(encrypted){
  console.log(encrypted)
  return pgp_lib.Decrypt(encrypted,privkey)
}).then(function(plaintext){
  console.log(plaintext)
  return pgp_lib.SearchKey("example@example.com")
}).then(function(result){
  console.log(result)
}).catch(function(err) {
  console.log(err)
})
