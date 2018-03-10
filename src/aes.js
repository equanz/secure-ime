import * as openpgp from 'openpgp'
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
      console.log(privkey)
      return pgp_lib.UploadKey(pubkey)
    }).catch(function(err){
      reject(err)
    }).then(function(){
      let options = {
        data: privkey,
        passwords: secret_key
      }
      openpgp.encrypt(options).then(function(ciphertext){
        ipcRenderer.send('save',ciphertext.data)
        resolve()
      }).catch(function(err){
        reject(err)
      })
    }).catch(function(err){
      reject(err)
    })
  })
}


export let DecryptKey = function(secret_key){
  return new Promise(function(resolve,reject){
    ipcRenderer.send('decrypt')
    ipcRenderer.on('reply',function(event,data){
      let options = {
        message: openpgp.message.readArmored(data),
        passwords: secret_key
      }
      openpgp.decrypt(options).then(function(privkey){
        resolve(privkey.data)
      }).catch(function(err){
        reject(err)
      })
    })
  })
}
