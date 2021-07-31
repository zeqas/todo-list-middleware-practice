const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

const dateToString = require('../../tools/dateToString')

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