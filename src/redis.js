const redis = require('redis')

const connect = async () => {
    return redis.createClient({
        host: process.env.REACT_APP_REDIS_HOST,
        port: process.env.REACT_APP_REDIS_PORT,
    })
}

module.exports = { connect }