import Vue from 'vue/dist/vue.esm'
import * as pgp_lib from './pgp.js'

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
      source_email: '',
      plaintext: ''
    }
  },
  // Method
  methods: {
    encrypt_click: function (e){
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
    decrypt_click: function (e){
    }
  }
})
