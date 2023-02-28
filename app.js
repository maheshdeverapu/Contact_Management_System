const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
const {MONGODB} = require("./keys")
mongoose.connect(MONGODB,{useNewUrlParser:true, useUnifiedTopology:true})
mongoose.connection.on('connected',()=>{
    console.log('connected to database')
})
mongoose.connection.on('error',(error)=>{
    console.log('error found',error)
})
app.use(express.json());
app.use(require("./routing/routing"))
app.get("/",(req,res)=>{
    res.send("ok")
})
app.listen(port,()=>{console.log(`server is up at port number ${port}`)})