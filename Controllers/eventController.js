const mongoose = require('mongoose')
const Event = require ('../Models/eventsModel')
const jwt = require ('jsonwebtoken')
const dotenv = require('dotenv')


// CREATE AN EVENT

const createEvent = async (req, res) =>{
  
  const {title,
    description,
    date,
    startTime ,
    endTime,
    eventType,
    eventLink,
    price,
    maxAtendees
   } = req.body

  try{

    const event = await Event.create({title , description})

    res.status(201).json({
      _id: event._id,
      title: event.title,
      description:event.description,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      eventType: event.eventType,
      eventLink : event.eventLink,
      price: event.price,
      maxAtendees: event.maxAtendees
    })
  }
  catch(error){
    console.error({error:error.message})
  }
}



//GET ALL EVENTS
const getAllEvents = async (req , res) => {
   try{
      const events = await  Event.find()
        res.status(200).json({
          title: events.title,
          eventType: events.eventType,
          date: events.date,
          price: events.price,
          createdBy : events.createdBy
    
      })
    }
    catch (error){
        console.error({error: error.message})

    }
}

// GET EVENT BY ID
  const getEventById = async (req, res) => {
   
    const event =  await Event.findOne(req.params.id)
         res.status(200).json({
          title: event.title,
          eventType: event.eventType,
          date: event.date,
          price: event.price,
          createdBy : event.createdBy,
          ticketAvilability: event.ticketAvilability,
          eventLink : event.eventLink
   })
  }


  //GET CREATED EVENTS BY ADMIN

  const getMyEvents = async (req , res ) => {
    const myEvents = await Event.find()
    const token = req.headers.authorization

    const decodedData = await jwt.verify(token , process.env.JWT-SECRET)
    const isAdmin = await User.findOne({_id : decodedData.id , role :decodedData.role})
    if ( isAdmin.role ==  decodedData.role && (isAdmin._id == decodedData.id)){
      res.status(200).json({myEvents})
    }

  }


  //EDIT EVENTS DETAILS

  const updateEvent = async (req , res ) => {
    const event = req.params.id


    
  }





module.exports = { createEvent,getAllEvents , getEventById ,getMyEvents}

