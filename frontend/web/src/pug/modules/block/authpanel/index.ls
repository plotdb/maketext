# 只覆寫樣式 ( index.styl ). 登入後不另外跳 cookie 同意 ( 面板已有服務條款 / 隱私權政策的說明 );
# cookie 告知改由所有頁面底部的提示列處理 ( /modules/mt/cookie.pug )
module.exports =
  pkg:
    extend: {name: '@servebase/auth', path: 'index.html'}
  interface: -> @parent.interface!
