const mongoose = require('mongoose')


const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,
            useUnifiedTopology: true})
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectDB;