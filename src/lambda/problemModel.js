const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const problemSchema = new Schema({
  number: { type: Number, required: true },
  area: { type: String, required: true },
  grade: { type: String, required: true },
  color: { type: String, required: true },
  dateSet: { type: Date, required: true },
  attempts: { type: Number, required: false },
  sends: { type: Number, required: false },
  flashed: { type: Boolean, required: false },
  project: { type: Boolean, required: false },
  notes: { type: String, required: false },
}, {
  timestamps: true,
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;