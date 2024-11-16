const mongoose = require('mongoose');

const widthDrawSchema = new mongoose.Schema({
  // referal token by uuid
  status: {
    type: String,
    default:"pending"
  },
  userId: { 
    type: String, 
    required: true 
  },
  pointRequested:String,
  widthDrawType:String,
  accNum:String
});

const WidthDraw = mongoose.model('WidthDrawReqs', widthDrawSchema);

module.exports = WidthDraw;
