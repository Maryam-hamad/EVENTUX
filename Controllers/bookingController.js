const mongoose = require ('mongoose')
const Ticket = require('../Models/bookingModel.js')
const Event = require('../Models/eventsModel.js')



//creating ticket

const bookEvent = async (req, res) => {

  const { eventId, name , email , ticketType ,ticketPrice } = req.body;

  const event = await Event.findById(eventId)
  if(!event) return res.status(404).json({message:"Event not found"})

  if(event.tickets == 0) return res.status(404).json({message:"This Event is Fully Booked"})

  event.tickets = event.tickets - ticket.numberOfTickets
  await event.save()

  const ticket = await Ticket.create({userId :req.user.id, eventId ,name, email, ticketType, ticketPrice})

  res.status(201).json({
    message:"Event Booked Successfully",
    name:ticket.name,
    ticket:ticket._id,
    event:event.title,
    date:event.date,
    eventLink:event.eventLink,
    startTime:event.startTime,
    endTime:event.endTime,

  })
   

}


//GET Request for a user tickets

const myTickets = async (req , res) =>{
  
  const tickets = await Ticket.find({user:req.user.id})
  return res.status(200).json(tickets)
  
}

//GET REQUEST FOR ADMIN TO SEE ALL THE BOOKINGS

const attendeeList = async (req , res) =>{
   const event = await Event.findById(req.params.id)
   if(!event) return res.status(200).json({message:"Event not Found"})

   return res.status(200).json({
     event:event.tickets
   })


}









// const allAttendees = async (req,res) => {
//    const event = await Event.findById(req.params.id)

//    if(!event) return res.status(200).json({message:"Event not Found"})

//     for (const ticket of event){
//       const event = await Ticket.find(ticket.event)

//     }

// }



module.exports = {bookEvent , myTickets , attendeeList }
  
