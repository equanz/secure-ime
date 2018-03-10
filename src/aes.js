import * as CryptoJS from 'crypto-js'
const fs = require('fs')
const path = require('path')

export let EncryptSave = function(original,secret_key){
  let ciphertext = CryptoJS.AES.encrypt(original,secret_key)
  let home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
  let folroot = path.join(home,".secure-ime")
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }
  let fileroot = path.join(folroot,"privkey.pem")
  fs.writeFile(fileroot,ciphertext.toString())
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
