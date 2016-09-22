var mongoose = require('mongoose')

var RabbitSchema = new mongoose.Schema({
  name: String,
  age: Number
})
mongoose.model('rabbit', RabbitSchema);