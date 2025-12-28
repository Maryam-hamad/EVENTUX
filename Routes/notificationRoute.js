const express = require('express')
const router = express.Router()
const {createMail , createNotification ,getNotifications  } = require('../Controllers/notificationController')
const protect = require('../MIddlewares/auth')
const admin = require('../MIddlewares/admin')



router.post("/send/mail" , protect,admin , createMail)
router.post("/send/app_notifications" , protect, admin ,createNotification )
router.get("/all" , protect ,getNotifications)

module.exports = router