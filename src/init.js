import Vue from 'vue/dist/vue.esm'
import * as aes_lib from './aes.js'

const bitnum = 256 // Default PGP key bit number

new Vue({
  // DOM ID
  el: '#app',
  // Property
  data: {
    name: '',
    email: '',
    pass: ''
  },
  // Method
  methods: {
    // register PGP key and save
    register: function (e){
      aes_lib.KeySave(this.name, this.email, bitnum, this.pass).then(() => {
        console.log('completed!') // TODO: page moving to encrypt/decrypt
      })
    }
  }
})

