const mongoose = require ('mongoose')
const express = require ("express")
const router = express.Router()
const {bookEvent , myTickets} = require('../Controllers/bookingController')
const protect =require("../MIddlewares/auth")
const admin = require ("../MIddlewares/admin")

router.post("/booking" , protect , bookEvent)
router.get('/my_tickets' , protect ,myTickets)
router.get("/event_attendees/:_id" , protect , admin)


module.exports = router