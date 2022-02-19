const ShortURL = require('../models/url')
const { connectRedis, jobQueue } = require('../helpers/redis')
const { range, hashGenerator, getTokenRange, removeToken } = require('../helpers/zookeeper')

let urlPost = async (req, res) => {
    if (range.curr < range.end - 1 && range.curr != 0) {
        range.curr++
    } else {
        await getTokenRange()
        range.curr++
    }

    console.log(range.curr)

    let redisClient = await connectRedis()

    redisClient.get(req.body.OriginalUrl, async (err, response) => {
        if (err) {
            console.log(err)
        } else if (response) {
            res.json(response)
        } else {
            ShortURL.findOne({ OriginalUrl: req.body.OriginalUrl }, (err, url) => {
                if (err) {
                    console.log(err)
                }
                else if (url) {
                    res.json({ OriginalUrl: url.OriginalUrl })
                    redisClient.setex(url.OriginalUrl, 600, url.Hash)
                } else {
                    ShortURL.create({
                        Hash: hashGenerator(range.curr - 1),
                        OriginalUrl: req.body.OriginalUrl,
                        Visits: 0,
                        CreatedAt: new Date(),
                        ExpiresAt: new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000))
                    }, (err, url) => {
                        if (err) {
                            console.log(err)
                        }
                        res.json(url.Hash)
                        redisClient.setex(req.body.OriginalUrl, 600, url.Hash)
                    })
                }
            })
        }
    })
}

let urlGet = async (req, res) => {
    ShortURL.findOne({ Hash: req.params.identifier }, (err, url) => {
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
}

let tokenDelete = async (req, res) => {
    removeToken()
}

module.exports = { urlPost, urlGet, tokenDelete }