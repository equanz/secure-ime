let openpgp = require('openpgp')

openpgp.initWorker({path:'openpgp.worker.js'})
openpgp.config.aead_protect = true

let hkp = new openpgp.HKP('https://pgp.mit.edu')

//鍵の作成に必要なoptionの設定
let options = {
  userIds:[{name:'example' , email:'example@example.com'}],
  numBit:256,
}

//鍵の作成
openpgp.generateKey(options).then(function(key){
  let privkey = key.privateKeyArmored
  let pubkey = key.publicKeyArmored

  let privKeyobj = openpgp.key.readArmored(privkey).keys[0]

  //暗号化に必要なoptionの設定
  let cryptoption = {
    data: 'Hello, World!',
    publicKeys: openpgp.key.readArmored(pubkey).keys
    //privateKeys: privKeyobj
  }

  //暗号化
  openpgp.encrypt(cryptoption).then(function(ciphertext){
    let encrypted = ciphertext.data

    //復号に必要なoptionの設定
    let decryptoption = {
      message: openpgp.message.readArmored(encrypted),
      //publicKeys: openpgp.key.readArmored(pubkey).keys,
      privateKey: privKeyobj
    }

    //復号
    openpgp.decrypt(decryptoption).then(function(plaintext){
      let plain = plaintext.data

      //HKPサーバへのアップロード
      hkp.upload(pubkey).then(function() {

      })
    })
  })
})
