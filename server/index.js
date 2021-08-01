// Author: Pranav Tupe

// Requirement
const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server,{
    cors: {
        origin: "*"
      }
});

const mongoose = require("mongoose");
const cors = require("cors");
var cookieParser = require('cookie-parser');
require("dotenv").config();

const authRoutes = require("./routes/auth")
const notificationsRoutes = require("./routes/notifications")

// Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Port
const port = process.env.PORT

// Route
app.get('/', (req, res)=>{
    res.send("Hello World");
})

app.use('/auth',authRoutes);
app.use("/notifications",notificationsRoutes)

// Listen
server.listen(port,()=>{
    console.log("Server is up and running...");
})