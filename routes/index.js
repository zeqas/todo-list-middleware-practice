const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todo')
const users = require('./modules/users')

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

const { authenticator} = require('../middleware/auth')

router.use('/todos', authenticator, todos)
router.use('/users', users)
router.use('/', authenticator, home)
// 匯出路由器
module.exports = router