let CryptoJS = require("crypto-js")
let fs = require("fs")
let path = require("path")

let ciphertext = CryptoJS.AES.encrypt('Hello world!','secret key 123')
console.log(ciphertext.toString())
let home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
let hoge =  path.join(home,'sec')
if (!fs.existsSync(hoge)) {
  fs.mkdirSync(hoge)
}
let fuga =  path.join(hoge,'a.txt')
fs.writeFile(fuga,'a')

let bytes = CryptoJS.AES.decrypt(ciphertext.toString(),'secret key 123')
let plain = bytes.toString(CryptoJS.enc.Utf8)

console.log(plain)
