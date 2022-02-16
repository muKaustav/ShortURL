require('dotenv').config()
const redis = require('redis')
const ShortURL = require('../models/url')

class Queue {
    constructor() {
        this.items = []
    }

    enqueue = async (element) => {
        if (this.size() < 10) {
            this.items.push(element)
        } else {
            while (!this.isEmpty()) {
                await ShortURL.findOneAndUpdate({ Hash: this.dequeue() }, { $inc: { Visits: 1 } })
                    .catch(err => console.log(err))
            }
        }
    }

    dequeue() {
        return this.items.shift()
    }

    isEmpty() {
        return this.items.length === 0
    }

    size() {
        return this.items.length
    }

    print() {
        console.log(this.items.toString())
    }
}

let jobQueue = new Queue()

const connectRedis = async () => {

    return redis.createClient({
        host: process.env.REACT_APP_REDIS_HOST,
        port: process.env.REACT_APP_REDIS_PORT,
    })
}

module.exports = { jobQueue, connectRedis }