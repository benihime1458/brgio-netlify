const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const problemLog = new Schema({
  number: { type: Number, required: true },
  area: { type: String, required: true },
  grade: { type: String, required: false },
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

const sessionLog = new Schema({
  session: { type: Number, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: false },
  problemLog: [problemLog],
}, {
  timestamps: true,
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
  },
  sessionLog: [sessionLog]
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;