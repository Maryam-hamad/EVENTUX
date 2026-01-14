const mongoose = require ('mongoose')


const eventSchema = new mongoose.Schema({
  user :{type: mongoose. Schema. Types. ObjectId, ref:'User' },
  title :{ type :String , required: true},
  description: { type : String , required :true},
  category:{
    type:String ,
    enum:['education','entertainment ','sports','charity' ],
    required : true
  },
  date:{ type : String , required : true},
  startTime:{type : String , required : true },
  endTime:{type : String , required : true },
  eventType:{ type : String , enum :['online' , 'offline' ]},
  eventUrl:{type: String ,required: true},
  price:{ type : Number , required : true},
  tickets:{ type:  Number, Required : true},
  ticketAvailability:{ type :String  , enum :[ 'available' , 'not available']},
  maxAtendees:{ type : Number , required : true },
  Thumbnail:{ type :String},
  createdBy: {type: String }

}, {timestamps : true}) 

module.exports = mongoose.model( 'Event' , eventSchema)