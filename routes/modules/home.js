const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  const userId = req.user._id   // 變數設定
  Todo.find({ userId })         // 加入查詢條件
    .lean()
    .sort({ _id: 'asc' }) 
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router