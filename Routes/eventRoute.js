const mongoose = require('mongoose')
const express = require ('express')
const { createEvent, getAllEvents , getEventById ,getMyEvents , updateEvent , deleteEvent} = require ('../Controllers/eventController');
const router = express.Router()
const protect = require('../MIddlewares/auth')
const admin = require('../MIddlewares/admin')



router.post("/create" ,protect, admin , createEvent)
router.get("/all_events" , getAllEvents)
router.get("/:_id" , getEventById )
router.get("/my_events" ,protect , getMyEvents)
router.put("/update/:_id", protect ,admin, updateEvent )
router.delete("/delete/:_id" , protect , admin, deleteEvent)




module.exports= router