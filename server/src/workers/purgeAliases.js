const cron = require('cron')
const URL = require('../models/url')

module.exports = () => {
    let job = new cron.CronJob('0 0 * * *', () => {
        URL.find({}, (err, urls) => {
            if (err) {
                console.log(err)
            } else {
                urls.forEach(url => {
                    if (url.ExpirationDate < Date.now()) {
                        URL.findByIdAndDelete(url._id, (err, url) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('Deleted test: ' + url._id)
                            }
                        })
                    }
                })
            }
        })
    }, null, true)
}
