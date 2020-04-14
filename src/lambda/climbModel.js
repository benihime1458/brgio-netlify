const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const climbSchema = new Schema({
  area: { type: String, required: true },
  number: { type: Number, required: true },
  color: { type: String, required: true },
  grade: { type: Number, required : false },
  dateSet: { type: Date, required: true },
  wcw: { type: Boolean, required: false },
  dyno: { type: Boolean, required: false },
}, {
    timestamps: true,
  });

const Climb = mongoose.model('Climb', climbSchema);

module.exports = Climb;