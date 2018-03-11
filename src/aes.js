import * as CryptoJS from 'crypto-js'
import * as pgp_lib from  './pgp.js'

const {ipcRenderer} = require('electron')

/**
  * 鍵の初期処理
  * @param name{string} - user name
  * @param email{string} -user email adress
  * @param bitnum{int} - key's bit number
  * @param secret_key(string) - pass phrase for private key encrypt
  * @return {Promise} - Promise object
  */
export let KeySave = function(name,email,bitnum,secret_key){
  return new Promise(function(resolve,reject){
    let privkey,pubkey
    pgp_lib.MakeKey(name,email,bitnum).then(function(keys){
      pubkey = keys.pubkey
      privkey = keys.privkey
      return pgp_lib.UploadKey(pubkey)
    }).catch(function(err){
      reject(err)
    }).then(function(){
      let ciphertext = CryptoJS.AES.encrypt(privkey,secret_key)
      ipcRenderer.send('save',ciphertext.toString())
    }).catch(function(err){
      reject(err)
    })
  })
}


export let DecryptKey = function(secret_key){
  return new Promise(function(resolve,reject){
    ipcRenderer.send('decrypt')
    ipcRenderer.on('reply',function(event,data){
      let bytes = CryptoJS.AES.decrypt(data,secret_key)
      try{
        let plain = bytes.toString(CryptoJS.enc.Utf8)
        resolve(plain)
      }
      catch(err){
        reject(err)
      }
    })
  })
}
