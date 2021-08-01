const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  userId: { // 加入關聯設定
    Type: Schema.Types.ObjectId,
    ref: 'User',
    index: true, // 把 userId 設定成「索引」
    required: true
  }
})
module.exports = mongoose.model('Todo', todoSchema)