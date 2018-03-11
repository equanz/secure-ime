import Vue from 'vue/dist/vue.esm'
import ClipboardJS from 'clipboard'
import * as pgp_lib from './pgp.js'
import * as aes_lib from './aes.js'

new Vue({
  el: '#mode-toggle',
  methods: {
    click: function (e){
      // delete active class for all
      for(let child of e.currentTarget.parentNode.parentNode.children){
        child.classList.remove('active')
      }
      // add active class to current target
      e.currentTarget.parentNode.classList.add('active')

      // change app instance data(encrypt)
      if(e.currentTarget.parentNode.id === 'encrypt'){
        app.toggle_encrypt = true
      }
      else{
        app.toggle_encrypt = false
      }
    }
  }
})

let app = new Vue({
  el: '#app',
  // Property
  data: {
    toggle_encrypt: true, // toggle state
    encrypt: {
      target_email: '',
      plaintext: '',
      ciphertext: ''
    },
    decrypt: {
      ciphertext: '',
      source_password: '',
      plaintext: ''
    }
  },
  // Method
  methods: {
    encrypt_click: function (){
      // search target public key
      pgp_lib.SearchKey(this.encrypt.target_email).then((target_pubkey) => {
        // encrypt by target public key
        return pgp_lib.Encrypt(this.encrypt.plaintext, target_pubkey)
      }).catch((err) => {
        window.alert(err)
      }).then((ciphertext) => {
        this.encrypt.ciphertext = ciphertext // add to model
      }).catch((err) => {
        window.alert(err)
      })
    },
    decrypt_click: function (){
      // get own private key
      aes_lib.KeyLoad(this.decrypt.source_password).then((own_privkey) => {
        // decrypt by own private key
        return pgp_lib.Decrypt(this.decrypt.ciphertext, own_privkey)
      }).catch((err) => {
        window.alert(err)
      }).then((plaintext) => {
        this.decrypt.plaintext = plaintext // add to model
      }).catch((err) => {
        window.alert(err)
      })
    }
  }
})

// encrypt clipboard
let clipboard = new ClipboardJS('#cipher_copy')

// copy succeed
clipboard.on('success', function(e){
  e.clearSelection() // unselect
  window.alert('Copied!')
})

