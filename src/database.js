const mongoose = require('mongoose')
require('dotenv').config()

const connect = async () => {
    return mongoose.connect('mongodb+srv://kauc:kauc@shorturldb.subzo.mongodb.net/urlshortener', {
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

module.exports = { connect }