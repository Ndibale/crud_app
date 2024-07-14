const express = require('express');
const router = require('express').Router();
const path = require('path')

router.get('^/$|/index(.html)?',(req, res)=>{
    res.sendFile(path.join(__dirname,'..','views','index.html'))
    // res.sendFile(path.join(__dirname,'..','..','front_end','public','index.html'))
})

module.exports = router;