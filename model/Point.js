const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  point: {
    type: Number,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'UserModal', 
    required: true // Link points to a user
  }
});

const Point = mongoose.model('Point', pointSchema);

module.exports = Point;
