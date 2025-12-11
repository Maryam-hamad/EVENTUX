const mongoose = require('mongoose')
const Event = require ('../Models/eventsModel')
const jwt = require ('jsonwebtoken')
const dotenv = require('dotenv')


// CREATE AN EVENT

const createEvent = async (req, res) =>{
  const event = new Event(req.body)
  const eventDb = event.save()
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
    const myEvents = await Event.find()
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





  module.exports = { createEvent, getAllEvents , getEventById ,getMyEvents , updateEvent}

