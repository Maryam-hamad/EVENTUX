const mongoose = require('mongoose')
const express = require ('express')
const { createEvent, getAllEvents , getEventById ,getMyEvents , updateEvent , deleteEvent , shareEvent, eventCode , filterEvent} = require ('../Controllers/eventController');
const router = express.Router()
const protect = require('../MIddlewares/auth')
const admin = require('../MIddlewares/admin')



router.post("/create" ,protect, admin , createEvent)
router.get("/all_events" , getAllEvents)
router.get("/:_id" , getEventById )
router.get("/my_events" ,protect , getMyEvents)
router.put("/update/:_id", protect ,admin, updateEvent )
router.delete("/delete/:_id" , protect , admin, deleteEvent)
router.post("/share" , protect ,shareEvent )
router.post("/join_with_code" , protect , eventCode)
router.get("/search" ,filterEvent)



module.exports= router