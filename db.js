const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ShareRoom');


const DBObject = mongoose.connection

DBObject.on('connected',()=>{console.log('MongoDB Connect Now')})
DBObject.on('error',()=>{console.log('MongoDB Failed')})


module.exports = mongoose