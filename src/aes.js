import * as CryptoJS from 'crypto-js'
import * as pgp_lib from  './pgp.js'

const {ipcRenderer} = require('electron')

/**
  * 鍵の初期処理
  * @param name{string} - user name
  * @param email{string} -user email adress
  * @param bitnum{int} - key's bit number
  * @param secret_key(string) - pass phrase for private key encrypt
  */
export let KeySave = function(name,email,bitnum,secret_key){
  let privkey,pubkey
  pgp_lib.MakeKey(name,email,bitnum).then(function(keys){
    pubkey = keys.pubkey
    privkey = keys.privkey
    return pgp_lib.UploadKey(pubkey)
  }).then(function(){
    let ciphertext = CryptoJS.AES.encrypt(privkey,secret_key)
    ipcRenderer.send('save',ciphertext.toString())
  })
}

/*
export let Decrypt = function(secret_key){
  let home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
  let root = path.join(home,'.secure-ime','privkey.pem')
  let crypted
  fs.readFile(root,'utf8',function(err,data){
    if(err){
      throw err
    }
    crypted = data
  })
  let bytes = CryptoJS.AES.decrypt(crypted,secret_key)
  return bytes.toString(CryptoJS.enc.utf8)

*/
