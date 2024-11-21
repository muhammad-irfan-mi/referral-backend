const mongoose = require('mongoose')


const db_connect=async()=>{
    mongoose.connect(process.env.MONGO_URL)
    // mongoose.connect('mongodb://127.0.0.1:27017/')
    .then(() => console.log('MongoDB Connecteddfg'))
    .catch((err) => console.log(err))
}
module.exports = db_connect
