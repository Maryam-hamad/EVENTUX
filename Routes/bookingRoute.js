const mongoose = require ('mongoose')
const express = require ("express")
const router = express.Router()
const {bookEvent , myTickets,attendeeList , cancelBooking} = require('../Controllers/bookingController')
const protect =require("../MIddlewares/auth")
const admin = require ("../MIddlewares/admin")

router.post("/booking" , protect , bookEvent)
router.get('/my_tickets' ,protect,myTickets)
router.get("/event_attendees/:_id",protect, admin, attendeeList )
router.delete("/cancel/_id" , protect , cancelBooking)


module.exports = router