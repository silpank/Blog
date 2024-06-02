//node+ mongodb connection

const mongoose = require('mongoose')

const connectionString = process.env.DATABASE
//connecting
mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb connection established");
})
.catch(err =>{
    console.log("Mongodb connection error" + err.message);
})