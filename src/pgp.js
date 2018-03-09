// モジュールのロード
import * as openpgp from 'openpgp'

//高速なAES-GCMモードの設定
//openpgp.config.aead_protect = true

const hkp_url = 'https://pgp.mit.edu' // PGP公開鍵サーバURL

/**
  * 暗号化
  * @param original{string} - uncrypt text
  * @param pubkey{string} - PGP public key for encrypt
  * @return {Promise} - Promise object represents the encrypt text
  */
export let Encrypt = function(original,pubkey){
  return new Promise(function(resolve,reject){
    let cryptoption = {
      data: original,
      publicKeys: openpgp.key.readArmored(pubkey).keys
    }

    openpgp.encrypt(cryptoption).then(function(ciphertext){
      resolve(ciphertext.data)
    }).catch(function(err){
      reject(err)
    })
  })

}

/**
  * 復号
  * @param cryptdata{string} - encrypted text
  * @param privkey{string} - PGP private key for decrypt
  * @return {Promise} - Promise object represents the decrypt txt
  */
export let Decrypt = function(cryptdata,privkey){
  return new Promise(function(resolve,reject){
    let decryptoption = {
      message: openpgp.message.readArmored(cryptdata),
      privateKey: openpgp.key.readArmored(privkey).keys[0]
    }

    openpgp.decrypt(decryptoption).then(function(plaintext){
      resolve(plaintext.data)
    }).catch(function(err){
      reject(err)
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
export let MakeKey = function(name,email,bitnum){
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
    }).catch(function(err){
      reject(err)
    })
  })
}

/**
  * 鍵のHKPサーバへのアップロード
  * @param pubkey{string} - PGP public key for upload HKP server
  * @return {Promise} - Promise object
  */
export let UploadKey = function(pubkey){
  return new Promise(function(resolve,reject){
    let hkp = new openpgp.HKP(hkp_url)
    hkp.upload(pubkey).then(function(){
      resolve()
    }).catch(function(err){
      reject(err)
    })
  })
}

/**
  * 鍵の検索
  * @param email{string} -  email addresss for search public key
  * @return {Promise} - Promise object represents the search result public key if none return undefinde  or err
  */
export let SearchKey = function(email){
  return new Promise(function(resolve,reject){
    let hkp = new openpgp.HKP(hkp_url)
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

