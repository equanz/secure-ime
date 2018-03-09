//clipboard使用の設定
var clipboard = new ClipboardJS('.btn')

clipboard.on('success',function(e){
  //成功時の処理
  e.clearSelection() //テキストの選択解除
})
clipboard.on('error',function(e){
  //失敗時の処理
})
