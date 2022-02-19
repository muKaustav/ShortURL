let sites = require('./maliciousSites.json')
const { BloomFilter } = require('bloom-filters')

let filter = new BloomFilter(15, 23)

for (let i = 0; i < sites.length; i++) {
    filter.add(sites[i].name)
}

const bloomFilterBool = async (site) => {
    return filter.has(site)
}

module.exports = { bloomFilterBool }