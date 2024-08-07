const express = require("express");
const conectTodb = require("./configs/db");
require("dotenv").config();
const session= require("express-session");
const MongoStore = require('connect-mongo');
const app = express();
const authRoute = require("./routes/auth");
const cors = require('cors');
const hotelController = require("./controllers/hotels.controller.js");

const bookedFlightRoute = require("./routes/BookedFlight");
const bookedHotelRoute = require("./routes/BookedHotel");
const flightController = require("./controllers/flight.controller");

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      // secure: true,
      httpOnly: true,
    }
  }));
  app.use(cors({
     origin:process.env.FRONT_URL
  }
));
app.get('/',(req,res)=>{
    try {
        res.send("This is a home route")
        console.log("this is the home route")
    } catch (error) {
        console.log("err in home route");
    }
})
app.use('/auth',authRoute)
app.use("/hotels", hotelController);
app.use("/bookings", bookedFlightRoute);
app.use("/bookings", bookedHotelRoute);
app.use("/flights", flightController);

const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URI;

app.listen(port,()=>{
    try {
        conectTodb(mongo_url);
        console.log("server listening on port");
    } catch (error) {
        
    }
})