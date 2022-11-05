require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.error('Connected to Database'))

app.use(express.json())
const adsRouter = require('./routes/ads')
app.use('/ads', adsRouter)
const companiesRouter = require('./routes/companies')
app.use('/companies', companiesRouter)
 
app.listen(5000, ()=>console.log('Server Started!'))