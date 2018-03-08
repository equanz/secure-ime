//高速なAES-GCMモードの設定
openpgp.config.aead_protect = true

//pgp各処理を行う関数を持ったオブジェクト
let pgp_func = {
  url: 'https://pgp.mit.edu'
}

/**
  * 暗号化
  * @param original{string} - uncrypt text
  * @param pubkey{string} - PGP public key for encrypt
  * @return {Promise} - Promise object represents the encrypt text
  */
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

/**
  * 復号
  * @param cryptdata{string} - encrypted text
  * @param privkey{string} - PGP private key for decrypt
  * @return {Promise} - Promise object represents the decrypt txt
  */
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

/**
  * 鍵の作成
  * @param name{string} - user name
  * @param email{string} -user email adress
  * @param bitnum{int} - key's bit number
  * @return {Promise} - Promise object represents the object included private key and public key
  */
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

/**
  * 鍵のHKPサーバへのアップロード
  * @param pubkey{string} - PGP punlic key for upload HKP server
  * @return {Promise} - Promise object
  */
pgp_func.UploadKey = function(pubkey){
  return new Promise(function(resolve,reject){
    let hkp = new openpgp.HKP(pgp_func.url)
    hkp.upload(pubkey).then(function(){
      resolve()
    })
  })
}

/**
  * 鍵の検索
  * @param email{string} -  email addresss for search public key
  * @return {Promise} - Promise object represents the search result public key or err
  */
pgp_func.SearchKey = function(email){
  return new Promise(function(resolve,reject){
    let hkp = new openpgp.HKP(pgp_func.url)
    let searchoption = {
      query:email
    }

    hkp.lookup(searchoption).then(function(key){
      resolve(key)
    }).catch(function(err){
      reject(err)
    })
  })
}
