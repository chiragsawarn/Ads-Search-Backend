const mongoose = require('mongoose')
const companies = require('./companies')

const adsSchema = new mongoose.Schema({
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:companies,
        required:true
    },
    companyName:{
        type:String,
        required:true,
    },
    primaryText:{
        type:String,
        required:true
    },
    headline:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    cta:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
})

adsSchema.index({"companyName":"text","primaryText":"text","headline":"text","description":"text",})

module.exports = mongoose.model('Ads',adsSchema)