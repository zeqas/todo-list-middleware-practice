const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const users = require('./modules/users')
const auth = require('./modules/auth')  // 引用模組

router.use('/', function (req, res, next) {
  const method = req.method
  const timeStart = new Date()

  const date = timeStart.toISOString().slice(0, 10)
  const time = timeStart.toLocaleTimeString('en-US', { timeStyle: 'medium', hour12: false })

  const url = req.url

  res.locals.logs = { method: method, date: date, time: time, url: url }

  res.on('finish', () => {
    const timeEnd = new Date()
    const ping = timeEnd - timeStart

    const message = `${date} ${time} | ${method} from ${url} | total time: ${ping}ms`
    console.log(message)
  })
  next()
})

const { authenticator } = require('../middleware/auth')

router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/auth', auth)  // 掛載模組
router.use('/', authenticator, home)
// 匯出路由器
module.exports = router