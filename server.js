const express = require ("express")
const dotenv = require ("dotenv")
const connectDb = require('./config/db')
const userRoute = require('./Routes/userRoute.js')
const eventRoute = require('./Routes/eventRoute.js')




//connect data-base
dotenv.config()
connectDb()

//prepare app
const app = express()
app.use(express.json()) 

// connect route
app.use('/auth', userRoute)
app.use('/event' , eventRoute)


const PORT = 7000
app.listen( PORT , () =>
  console.log(`server is running on http://localhost:${PORT}`)
)