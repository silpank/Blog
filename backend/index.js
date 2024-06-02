//load .env file into process.env by default
require('dotenv').config()

// import express
const express = require('express')

//import Router
const router =require('./Routes/router')

const jwtmiddleware = require("./Middlewares/jwtMiddleware")

//import cors
const cors = require ('cors')

 //import DB
const db = require('./DB/connection')

//create a application using express
const blogServer = express()


//using cors to connect forntend 
blogServer.use(cors())

//create a middleware for parsing json data
blogServer.use(express.json())

// telling to use in backend
blogServer.use(router)

blogServer.use('/uploads', express.static('uploads'));

// creation port
const PORT = 8000 || process.env.PORT

blogServer.listen(PORT,()=>{
    console.log("blogServer Listening on tha port " + PORT);
})

//localhost:8000
blogServer.get('/',(req,res)=>{
  res.send(`<h1>Blog Server is Started</h1>`)    
})