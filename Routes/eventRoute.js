const mongoose = require('mongoose')
const express = require ('express')
const { createEvent, getAllEvents , getEventById ,getMyEvents } = require ('../Controllers/eventController');
const router = express.Router()


router.post("/create" , createEvent)
router.get("/all" , getAllEvents)
router.get("/:_id" , getEventById )
router.get("/my_events" , getMyEvents)




module.exports= router