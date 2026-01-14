const mongoose = require ('mongoose')
const Ticket = require('../Models/bookingModel.js')
const Event = require('../Models/eventsModel.js')



//creating ticket

const bookEvent = async (req, res) => {
  const { eventId, name, email, ticketType, ticketPrice, numberOfTickets } = req.body

  const event = await Event.findById(eventId)
  if (!event) return res.status(404).json({ message: "Event not found" })

  if (event.tickets < (numberOfTickets || 1) )
    return res.status(400).json({ message: "Not enough tickets available" })

  const existingTicket = await Ticket.findOne({email,eventId })

  if (existingTicket) return res.status(400).json({ message: "You already booked this event" })

  const ticket = await Ticket.create({
    userId: req.user.id,
    eventId,
    name,
    email,
    ticketType,
    ticketPrice,
    numberOfTickets: numberOfTickets || 1
  })

  event.tickets -= ticket.numberOfTickets
  await event.save()

  res.status(201).json({
    message: "Event Booked Successfully",
    name: ticket.name,
    ticket: ticket._id,
    event: event.title,
    date: event.date,
    eventLink: event.eventLink,
    startTime: event.startTime,
    endTime: event.endTime
  })
}



//GET Request for a user tickets

const myTickets = async (req , res) =>{
  
  const tickets = await Ticket.find({user:req.user.id})
  .populate("eventId" , "title description date  eventUrl")//added the commas ...dont do it next time



  if(!tickets || tickets.length === 0) return res.status(404).json({message:"No active Tickets Avilable."})

  const myTickets = tickets.map(ticket => ({
   ticket:ticket._id,
   event:ticket.eventId.title,
   eventType:ticket.eventId.eventType,
   date:ticket.eventId.date,
   createdAt:ticket.createdAt,
   ticketStatus:ticket.ticketStatus
    
  }))
  return res.status(200).json(myTickets)
  
}




//GET REQUEST FOR ADMIN TO SEE ALL THE BOOKINGS

const attendeeList = async (req , res) =>{

   const eventId = req.params.id

    const tickets = await Ticket.find({eventId,UserId:req.user.id})
    .populate("userId" , "_id role ")
    .populate('ticketStatus')

    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" })
    }

    const attendees = tickets.map(ticket => ({
      name: ticket.name,
      email: ticket.email,
      createdAt: ticket.createdAt
      
    }))

    return res.status(200).json(attendees)
}


//delete request..to cancel booking

const cancelBooking = async (req, res) => {

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not Found" })
  }

  const event = await Event.findById(ticket.eventId)
  if (!event) {
    return res.status(404).json({ message: "Event not found" })
  }

  event.tickets += ticket.numberOfTickets
  await event.save()

  ticket.ticketStatus ='canceled'
  await ticket.save()

  res.status(200).json({ message: "Booking cancelled successfully" })
}








module.exports = {bookEvent , myTickets , attendeeList , cancelBooking }
  
