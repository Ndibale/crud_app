const User =require('../models/UserDetails')
const Note=require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')



const getAllUsers = asyncHandler(async (req,res)=>{
    const users = await User.find().select('-password').lean()
    if(!users?.length) return res.status(400).json({message:'No users found'})

    res.json(users);
})


const createNewUser = asyncHandler(async (req, res) => {
    const { username, email, password, ConfirmPassword, roles } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) return res.status(409).json({ message: "Duplicate user" });

    if (ConfirmPassword !== password) {
        return res.status(400).json({ message: "Invalid user password" }); // Change status to 400
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = { username, email, "password": hashedPassword, roles };

    // Creating a new user 
    const user = await User.create(userObject);

    if (user) {
        return res.status(201).json({ message: `New user called ${username} has been created` });
    } else {
        return res.status(400).json({ message: "Invalid user data has been received" });
    }
});





const updateUser = asyncHandler(async (req,res)=>{
    const {id, username, roles, active, password }= req.body;

    if(!id || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        return res.status(400).json({message:"All fields are required!"})
    }

    const user = await User.findById(id).exec();

    if(!user) return res.status(400).json({message:"User is not found"})

    const duplicate = await User.findOne({username}).lean().exec();

    if(duplicate && duplicate?._id.toString() !== id ){
        return res.status(409).json({message:"Duplicate user!"})
    }

        user.username = username
        user.roles = roles
        user.active = active
    

        if(password) {
            return user.password = await bcrypt.hash(password, 10)
        }

        const updatedUser = await user.save();

        res.json({message:`${updatedUser.username} updated` })
})


const deleteUser = asyncHandler(async (req,res)=>{
    const { id } = req.body;

    console.log("req.body", req.body);

    if(!id) return res.status(400).json({message:"User identinty is required"});

    const note = await Note.findOne({user: id}).lean().exec();

    if(note) return res.status(400).json({message: "User has assigned notes"});

    // const user = await User.findById(id).exec();

    if(!user) return res.status(400).json({message: "User not found"});


    const result = await user.deleteOne();
    
    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply);
})


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}