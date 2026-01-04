const express = require ("express")
const dotenv = require ("dotenv")
const connectDb = require('./config/db')
const userRoute = require('./Routes/userRoute.js')
const eventRoute = require('./Routes/eventRoute.js')
const { notFound, errorHandler} = require("./MIddlewares/error.js")
const bookingRoute = require ('./Routes/bookingRoute.js')
const notificationRoute = require('./Routes/notificationRoute.js')
const cors = require('cors')


//connect data-base
dotenv.config()
connectDb()

//prepare app

const app = express()
app.use(express.json()) 
app.use(cors())

// connect route
app.use('/auth', userRoute)
app.use('/event', eventRoute)
app.use('/ticket', bookingRoute)
app.use('/notification' , notificationRoute)




//error handlers

app.use(notFound)
app.use(errorHandler)


const PORT = 7000
app.listen( PORT , () =>
  console.log(`server is running on http://localhost:${PORT}`)
)