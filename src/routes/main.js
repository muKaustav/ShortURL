const express = require('express')
const zookeeper = require('node-zookeeper-client')
const ShortURL = require('../models/url')
const router = express.Router()

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

router.post('/', (req, res) => {
    if (range.curr < range.end - 1 && range.curr != 0) {
        res.send(hashGenerator(range.curr))
        console.log('Token: %d', range.curr)
        range.curr++
    } else {
        getTokenRange()
        res.send(hashGenerator(range.curr))
        console.log('Token: %d', range.curr)
        range.curr++
    }

    ShortURL.findOne({ OriginalUrl: req.body.OriginalUrl }, (err, url) => {
        if (err) {
            console.log(err)
        }
        else if (url) {
            console.log(url)
            res.json(url.Hash)
        } else {
            ShortURL.create({
                Hash: hashGenerator(range.curr),
                OriginalUrl: req.body.OriginalUrl,
                CreatedAt: new Date(),
                ExpiresAt: new Date() + (1000 * 60 * 60 * 24 * 7)
            }, (err, url) => {
                if (err) {
                    console.log(err)
                }
                console.log(url)
                res.json(url.Hash)
            })
        }
    })
})

router.get('/:hash', (req, res) => {
    ShortURL.findOne({ Hash: req.params.hash }, (err, url) => {
        if (err) {
            console.log(err)
        }
        else if (url) {
            console.log(url)
            res.redirect(url.OriginalUrl)
        } else {
            res.send('URL not found')
        }
    })
})

router.get('/del', (req, res) => {
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