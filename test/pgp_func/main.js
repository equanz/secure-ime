let pubkey,privkey
pgp_func.MakeKey('example','example@email.com',256).then(function(keys) {
  pubkey = keys.pubkey
  privkey = keys.privkey
  return pgp_func.Encrypt('Hello world!',pubkey)
}).then(function(encrypted){
  console.log(encrypted)
  return pgp_func.Decrypt(encrypted,privkey)
}).then(function(plaintext){
  console.log(plaintext)
})
