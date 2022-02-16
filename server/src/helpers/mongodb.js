require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
    return mongoose.connect(process.env.REACT_APP_MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to database.')
    }
    ).catch(err => {
        console.log('Could not connect to database.')
        console.log(err)
    })
}

module.exports = { connectDB }