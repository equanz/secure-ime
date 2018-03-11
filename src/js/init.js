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
    register: function (){
      aes_lib.KeySave(this.name, this.email, bitnum, this.pass).then(() => {
        window.location.href = './index.html' // page moving
      }).catch((err) => { // error handle
        window.alert(err) // popup alert window
      })
    }
  }
})

