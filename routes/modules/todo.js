const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

const dateToString = require('../../tools/dateToString')
///// ----- Middleware-practice ----- /////

// 每當應用程式收到要求時，就會執行此函數
// getTime() : JS的時間戳  
// router.use('/', function (req, res, next) {
  
  
  // const date = new Date.now
  // console.log(date)

//   console.log( dateToString(date) + " | " + `${req.method} from ${req.originalUrl}`)
//   next()
// })

// 對 /:id 路徑上任何類型的 HTTP 要求，執行此函數
// Request URL: /todos/60e0662c9b02b91f0c0feb38
// Request Type: GET

// router.use('/:id', function (req, res, next) {
//   console.log('Request URL:', req.originalUrl)
//   next()
// }, function (req, res, next) {
//   next()
// })


// 路由處理程式可為 一個路徑 定義 多個路由
// 下列範例為指向 /:id 路徑的 GET 要求，定義兩個路由
// 第二個路由不會造成任何問題，卻絕不會呼叫，因為第一個路由會結束要求/回應循環

// router.get('/:id', function (req, res, next) {
//   // if the ID is 0, skip to the next router
//   if (req.params.id === 0) next('route')
//   else next() 
// }, function (req, res, next) {
//   console.log('ID:', req.params.id) 
//   next()
// }, function (req, res, next) {
//   res.send('User Info') // 顯示字串
//   next() // 無效
// })

// 結束並且印出req.params.id
// router.get('/:id', function (req, res, next) {
//   res.end(req.params.id)
// })

// ** 目標一：印出 時間戳記  req.method  URL

// 時間戳記 time-stamp

router.use('/', function (req, res, next) {
  // 從 Date 類別建立一個新的物件，return建立的時間
  let date = new Date 

  console.log(dateToString(date) + " | " + `${req.method} from ${req.originalUrl}`)
  next()
})

///// ----- Middleware-practice END----- /////

// Create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name

  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Read
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// Update
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body

  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router