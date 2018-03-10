import Vue from 'vue/dist/vue.esm'
//import * as pgp_lib from './pgp.js'
//import * as a from './aes.js'

/* let mode_toggle = */new Vue({
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
        app.encrypt = true
      }
      else{
        app.encrypt = false
      }
    }
  }
})

let app = new Vue({
  el: '#app',
  data: {
    encrypt: true
  }
})

/*
a.KeySave('example','fcq07590@sawoe.com',256,'secret').then(function(){
  return a.DecryptKey('secret')
}).then(function(s){
  console.log(s)
})
*/
