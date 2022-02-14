require('dotenv').config()
const express = require('express')
const redis = require('redis')
const zookeeper = require('node-zookeeper-client')
const ShortURL = require('../models/url')
const router = express.Router()

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

var redisClient = redis.createClient({
    host: process.env.REACT_APP_REDIS_HOST,
    port: process.env.REACT_APP_REDIS_PORT,
})

redisClient.on('connect', async () => {
    console.log('Connected to the Redis server.')
})

var zkClient = zookeeper.createClient('zookeeper-server')

let range = {
    start: 0,
    end: 0,
    curr: 0
}

let hashGenerator = (n) => {
    hash = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    hash_str = ''

    while (n > 0) {
        hash_str += hash[n % 62]
        n = Math.floor(n / 62)
    }

    return hash_str
}

let createToken = async () => {

    let buffer = Buffer.from('0', 'utf8')

    zkClient.create('/token', buffer, zookeeper.CreateMode.PERSISTENT, (error, path) => {
        if (error) {
            console.log(error.stack)
            return
        }

        console.log('Node: %s is created.', path)

    })
}

let setTokenRange = async (token) => {
    let dataToSet = Buffer.from(String(token), 'utf8')

    zkClient.setData('/token', dataToSet, (error, stat) => {
        if (error) {
            console.log(error.stack)
            return
        }

        console.log('Data is set.')
    })
}

let getTokenRange = async () => {

    zkClient.getData('/token', (error, data, stat) => {
        if (error) {
            console.log(error.stack)
            return
        }

        range.start = parseInt(data.toString()) + 1000000
        range.curr = parseInt(data.toString()) + 1000000
        range.end = parseInt(data.toString()) + 2000000

        setTokenRange(range.start)
    })
}

let checkIfTokenExists = async () => {

    zkClient.exists('/token', (error, stat) => {
        if (error) {
            console.log(error.stack)
            return
        }

        if (stat) {
            console.log('Node exists: %s', stat)
        } else {
            createToken()
        }
    })
}

zkClient.once('connected', async () => {
    console.log('Connected to the ZK server.')
    checkIfTokenExists()
})

zkClient.connect()

router.post('/', async (req, res) => {
    if (range.curr < range.end - 1 && range.curr != 0) {
        range.curr++
    } else {
        getTokenRange()
        range.curr++
    }

    let cacheSelect = req.body.Nickname != null ? req.body.Nickname : req.body.OriginalUrl

    redisClient.get(cacheSelect, async (err, response) => {
        if (err) {
            console.log(err)
        } else if (response) {
            res.json(response)
        } else {
            ShortURL.findOne({
                $and: [
                    { OriginalUrl: req.body.OriginalUrl },
                    { Nickname: req.body.Nickname }]
            }, (err, url) => {
                if (err) {
                    console.log(err)
                }
                else if (url) {

                    res.json({
                        OriginalUrl: url.OriginalUrl,
                        Nickname: url.Nickname
                    })

                    redisClient.setex(url.OriginalUrl, 600, url.Nickname)
                } else {
                    if (req.body.Nickname) {
                        ShortURL.create({
                            Hash: hashGenerator(range.curr - 1),
                            Nickname: req.body.Nickname,
                            OriginalUrl: req.body.OriginalUrl,
                            Visits: 0,
                            CreatedAt: new Date(),
                            ExpiresAt: new Date(new Date().getTime() + (1000 * 24 * 60 * 60 * 1000))
                        }, (err, url) => {
                            if (err) {
                                console.log(err)
                            }
                            res.json(url.Nickname)
                            redisClient.setex(req.body.OriginalUrl, 600, url.Nickname)
                        })
                    } else {
                        ShortURL.create({
                            Hash: hashGenerator(range.curr - 1),
                            OriginalUrl: req.body.OriginalUrl,
                            Visits: 0,
                            CreatedAt: new Date(),
                            ExpiresAt: new Date(new Date().getTime() + (1000 * 24 * 60 * 60 * 1000))
                        }, (err, url) => {
                            if (err) {
                                console.log(err)
                            }
                            res.json(url.Hash)
                            redisClient.setex(req.body.OriginalUrl, 600, url.Hash)
                        })
                    }
                }
            })
        }
    })
})

router.get('/:identifier', (req, res) => {
    ShortURL.findOne({ $or: [{ Hash: req.params.identifier }, { Nickname: req.params.identifier }] }
        , (err, url) => {
            if (err) {
                console.log(err)
            }
            if (url) {
                res.redirect(url.OriginalUrl)
                jobQueue.enqueue(url.Hash)

            } else {
                res.send('URL not found')
            }
        })
})

router.get('/token/del', (req, res) => {
    zkClient.remove('/token', (error, stat) => {
        if (error) {
            console.log(error.stack)
            return
        }

        console.log('Node is deleted.')
    })
})

module.exports = router

// docker compose up --build
