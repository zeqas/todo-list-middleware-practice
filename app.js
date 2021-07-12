// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')

// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

const app = express()

// 載入 method-override
const methodOverride = require('method-override')

// 樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting body-parser
app.use(express.urlencoded({ extended: true })) //改寫成 express

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})