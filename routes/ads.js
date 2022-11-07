const express = require('express')
const router = express.Router()
const Ads = require('../models/ads')
const Companies = require('../models/companies')
const mongoose = require('mongoose')

// Getting all
router.get('/', async (req, res)=>{
    try{
        const ads = await Ads.find().populate({
            path:'companyId'
        })
        res.json(ads)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Search
router.post('/search', async (req, res)=>{
    try{
        const searchInput = req.body.searchInput;
        const ads = await  Ads.aggregate([{$lookup:{from:'companies', localField:'companyId',foreignField:'_id',as:'company'}},{$unwind:'$company'},{$addFields:{companyName:'$company.name'}},{$match:{$or:[{companyName:searchInput},{primaryText:searchInput},{headline:searchInput},{description:searchInput}]}}]);
        res.json(ads)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Getting one
router.get('/:id', getAd, (req, res)=>{
    res.json(res.ad)
})

// Create one
router.post('/', async (req, res)=>{
    const ad = new Ads({
        companyId:req.body.companyId,
        primaryText:req.body.primaryText,
        headline:req.body.headline,
        description:req.body.description,
        cta:req.body.cta,
        imageUrl:req.body.imageUrl
    })

    try{
        const newAd = await ad.save()
        res.status(201).json(newAd)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

// Updating one
router.patch('/', getAd, (req, res)=>{

})

// Deleting One
router.delete('/:id', getAd, (req, res)=>{

})

// Middleware to handle ids
async function getAd(req, res, next){
    let ad
    try{
        ad = await Ads.findById(req.params.id)
        if(ad == null){
            return res.status(404).json({message:'Cannot find Ad!'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.ad = ad
    next()
}

module.exports = router