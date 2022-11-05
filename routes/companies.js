const express = require('express')
const router = express.Router()
const Companies = require('../models/companies')
const mongoose = require('mongoose')

// Getting all
router.get('/', async (req, res)=>{
    try{
        const companies = await Companies.find()
        res.json(companies)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

// Getting one
router.get('/:id', getCompany, (req, res)=>{
    res.json(res.company)
})

// Create one
router.post('/', async (req, res)=>{
    const company = new Companies({
        name:req.body.name,
        url:req.body.url
    })

    try{
        const newCompany = await company.save()
        res.status(201).json(newCompany)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

// Updating one
router.patch('/', getCompany, (req, res)=>{

})

// Deleting One
router.delete('/:id', getCompany, (req, res)=>{

})

// Middleware to handle ids
async function getCompany(req, res, next){
    let company
    try{
        company = await Companies.findById(req.params.id)
        if(company == null){
            return res.status(404).json({message:'Cannot find Company!'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})
    }

    res.company = company
    next()
}

module.exports = router