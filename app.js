// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash') // 引用套件

// 如果應用程式不是在「正式上線模式 (production mode)」中執行，就透過 dotenv 去讀取在 env 檔案裡的資訊
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 引用路由器
const routes = require('./routes')

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

// 載入 method-override
const methodOverride = require('method-override')

// 樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// setting body-parser
app.use(express.urlencoded({ extended: true })) //改寫成 express

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  // console.log(req.user) 

  // 把 req.isAuthenticated() 回傳的布林值，交接給 res 使用
  res.locals.isAuthenticated = req.isAuthenticated() 

  // 把使用者資料交接給 res 使用
  // **放在 res.locals 裡的資料，所有的 view 都可以存取
  res.locals.user = req.user
  // 設定 success_msg 訊息
  res.locals.success_msg = req.flash('success_msg')
  // 設定 warning_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
// 將 request 導入路由器
app.use(routes)

// 設定 port 
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})