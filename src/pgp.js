openpgp.config.aead_protect = true

let pgp_func = {}

//暗号化
pgp_func.Encrypt = function(original,pubkey){
  return new Promise(function(resolve,reject){
    let cryptoption = {
      data: original,
      publicKeys: openpgp.key.readArmored(pubkey).keys
    }

    openpgp.encrypt(cryptoption).then(function(ciphertext){
      resolve(ciphertext.data)
    })
  })

}

//復号
pgp_func.Decrypt = function(cryptdata,privkey){
  return new Promise(function(resolve,reject){
    let decryptoption = {
      message: openpgp.message.readArmored(cryptdata),
      privateKey: openpgp.key.readArmored(privkey).keys[0]
    }

    openpgp.decrypt(decryptoption).then(function(plaintext){
      resolve(plaintext.data)
    })
  })
}

//鍵の作成
pgp_func.MakeKey = function(name,email,bitnum){
  return new Promise(function(resolve,reject){
    let useroption = {
      userIds:[{name:name,email:email}],
      numBit:bitnum
    }

    openpgp.generateKey(useroption).then(function(key){
      let keys ={
        pubkey:key.publicKeyArmored,
        privkey:key.privateKeyArmored
      }
      resolve(keys)
    })
  })
}

//鍵のHKPサーバへのアップロード
pgp_func.UploadKey = function(pubkey){
  return new Promise(function(resolve,reject){
    let hkp = new openpgp.HKP('https://pgp.mit.edu')
    hkp.upload(pubkey).then(function(){
      resolve()
    })
  })
}

//鍵の検索
pgp_func.SearchKey = function(email){
  return new Promise(function(resolve,reject){
    let hkp = new openpgp.HKP('https://pgp.mit.edu')
    let searchoption = {
      query:email
    }

    hkp.lookup(searchoption).then(function(key){
      resolve(key)
    })
  })
}
