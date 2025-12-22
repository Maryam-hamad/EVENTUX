const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  numberOfTickets:{
    type:Number,
    default:1,
  },

  ticketType: {
    type: String,
    enum: ['standard', 'vip'],
    default: 'standard'
  },

  ticketPrice: {
    type: Number,
    required: true,
  }
}, {timestamps: true});

// Using Compound index to prevent duplicate email per event
ticketSchema.index({ email: 1, eventId: 1 }, { unique: true })

module.exports = mongoose.model('Ticket', ticketSchema)
