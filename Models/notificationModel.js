const mongoose = require ('mongoose')


const emailSchema = mongoose.Schema({

  setTo:{type:String, required: true},
  setFrom:{ type: String , required: true},
  message:{type:String , required:true}

})

module.exports = mongoose.model('Email' , NotificationSchema)