const mongoose = require('mongoose')
const express = require ('express')
const { createEvent, getAllEvents , getEventById ,getMyEvents , updateEvent } = require ('../Controllers/eventController');
const router = express.Router()
const protect = require('../MIddlewares/auth')
const admin = require('../MIddlewares/admin')



router.post("/create" ,protect, admin , createEvent)
router.get("/all" , getAllEvents)
router.get("/:_id" , getEventById )
router.get("/my_events" ,protect , getMyEvents)




module.exports= router