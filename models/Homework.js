var mongoose = require('mongoose');

var HomeworkSchema = new mongoose.Schema({
  name: String,
  text: String,
  date: Object,
  practiceNum: Number,
  time: String,
});

var Homework = mongoose.model('Homework', HomeworkSchema);

module.exports = Homework;


