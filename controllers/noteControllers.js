const User =require('../models/UserDetails')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')


const getAllNotes = asyncHandler(async (req,res)=>{
    const users = await User.find().select('-password').lean()
    if(!users) return res.status(400).json({message:'No notes found'})

    res.json(users);
})


const createNewNote = asyncHandler(async (req,res)=>{
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


const updateNote = asyncHandler(async (req,res)=>{
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


const deleteNote = asyncHandler(async (req,res)=>{
    const { id } = req.body;

    console.log("req.body", req.body);

    if(!id) return res.status(400).json({message:"Note identinty is required"});

    const note = await Note.findOne({note: id}).lean().exec();

    if(note) return res.status(400).json({message: "Note has assigned notes"});

    if(!note) return res.status(400).json({message: "Note not found"});


    const result = await Note.deleteOne();
    
    const reply = `Notename ${result.Notename} with ID ${result._id} deleted`

    res.json(reply);
})


module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}