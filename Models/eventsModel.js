const mongoose = require ('mongoose')


const eventSchema = new mongoose.Schema({
  title :{ type :String , required: true},
  description: { type : String , required :true},
  date:{ type : String , required : true},
  startTime:{type : String , required : true },
  endTime:{type : String , required : true },
  eventType:{ type : String , enum :['online' , 'offline' ]},
  eventLink:{type: String ,required :true},
  price:{ type : Number , required : true},
  Tickets:{ type: Number , Required : true},
  ticketAvilability:{ type :String  , enum :[ 'Avilable' , 'Not avilable']},
  maxAtendees:{ type : Number , required : true },
  Thumbnail:{ type :String},
  createdBy: {type: String ,required : true}

}, {timestamps : true}) 

module.exports = mongoose.model( 'Event' , eventSchema)