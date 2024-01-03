const User =require('../models/UserDetails');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const login = asyncHandler(async (req,res)=>{
    const { username, password } = req.body;

    if(!username || !password) return res.status(400).json({message:"All fields are required"})

})


const refresh = asyncHandler(async (req,res)=>{
    const { person, title, text } = req.body;
   

    if(!person || !title|| !text ){
        return res.status(400).json({message: 'All fields are required'})
    }


    const duplicate = await Note.findOne({person}).lean().exec();

    if(duplicate) return res.status(409).json({message:"Duplicate person"})

    try {
        const noteObject = {person, title, text}
        console.log(noteObject)
        
        // Creating a new Note 
        const note = await Note.create(noteObject);
    } catch (error) {
        console.log(error.message);
    }


    if(note){
        res.status(201).json({message:`New Note called ${person} has made a post`})
    }else{
        res.status(400).json({message:"invalid Note data has been received"})
    }
})


const logout = asyncHandler(async (req,res)=>{
    const {id, person, title, text, roles}= req.body;

    if(!id || !person || !title || !text || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({message:"All fields are required!"})
    }

    const note = await Note.findById(id).exec();

    if(!note) return res.status(400).json({message:"Note is not found"})

    const duplicate = await Note.findOne({person}).lean().exec();

    if(duplicate && duplicate?._id.toString() !== id ){
        return res.status(409).json({message:"Duplicate person!"})
    }

        note.person = person
        note.roles = roles
        note.title = title
        note.text = text
    

        const updatedNote = await note.save();

        res.json({message:`${updatedNote.person} updated` })
})





module.exports = {
   login,
    refresh,
   logout
}