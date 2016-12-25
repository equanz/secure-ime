(function(){
  //jQuery
  var $ = require('jquery');
  // openpgp
  var openpgp = require('openpgp');

  $('#inputbt').click(function(){
    let $filetext = $('#filetext');

    // fileが定義済の場合
    if($filetext.val() !== ""){
      let options, encrypted;
      let key = "testkey";

      options = {
        data: $('#inputtext').val(),
        passwords: [key]
      };

      openpgp.encrypt(options).then(function(ciphertext) {
        encrypted = ciphertext.data;
        $('#outputtext').val(encrypted);
      });
    }
  });
})();
