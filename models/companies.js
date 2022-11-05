const mongoose = require('mongoose')
const companiesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    url:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Companies',companiesSchema)