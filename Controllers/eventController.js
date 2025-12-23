const mongoose = require('mongoose')
const Event = require ('../Models/eventsModel')
const jwt = require ('jsonwebtoken')
const dotenv = require('dotenv')
const generateCode = require('random-code-generate')


// CREATE AN EVENT

const createEvent = async (req, res) =>{

      const event = new Event(req.body)
      const eventDb =await  event.save()
      res.status(201).json(eventDb)

}
  



//GET ALL EVENTS
const getAllEvents = async (req , res) => {
   
  const events = await  Event.find()
  res.status(200).json(events)
  
}


// GET EVENT BY ID
  const getEventById = async (req, res) => {
   
    const event =  await Event.findOne(req.params.id)

    if(event)res.status(200).json(event)
    else res.status(404).json({message:"Event not found"})
          
  }
 

  //GET CREATED EVENTS BY ADMIN

  const getMyEvents = async (req , res ) => {
    const myEvents = await Event.find({user:req.user.id})
    res.status(200).json(myEvents)
    }



  //EDIT EVENTS DETAILS

   const updateEvent = async (req , res ) => {
    const event = await Event.findbyId(req.params.id)

    if (!event)return res.status(404).json({message:"Event not Found"})

    Object.assign(event , req.body)
    const updatedEvent = await event.save()
    res.status(201).json(updatedEvent)
   
  }
 // DELETE EVENT
 
  const deleteEvent = async (req , res ) => {
    const event = await Event.findById( req.params.id)

    if (!event) return res.status(403).json({message:"Event is not Avilable"})

    await event.deleteOne();
    res.status(200).json({message:"Event deleted Successfully"})


  }


  //post req for  event sharing api

  const shareEvent = async ( req,res) => {
    const eventId = (req.body)
    if(!eventId) return res.status(404).json({message:"Event not found"})

    const Url = `http://localhost:7000/event/share/${eventId}`
    return res.status(201).json(Url)

  } 



 //post req to. join event with code 

 const eventCode = async (req,res) => {
  const eventId = (req.body)
  if(!eventId) return res.status(404).json({message:"Event not found"})

 let OTP = generateCode.generateOtp() 
  return res.status(201).json(OTP)
  
 }

//EVENT FILTERING API

 const filterEvent = async (req , res) => {
  const event = await Event.find(req.body.title,
    req.body.eventType,
    req.body.category,
    req.body.price,
    req.body.DateRange
  )

  if(!event) return res.status(404).json({message:"Event not found"})

  return res.status(200).json(event)

 }


  module.exports = { createEvent, getAllEvents , getEventById ,getMyEvents , updateEvent , deleteEvent ,shareEvent , eventCode, filterEvent} 

