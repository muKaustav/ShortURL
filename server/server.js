const cors = require('cors')
const express = require('express')
const mainRoute = require('./src/routes/main')
const purgeAliases = require('./src/workers/purgeAliases')
require('./src/helpers/mongodb').connectDB()
require('./src/helpers/redis').connectRedis()
require('./src/helpers/zookeeper').connectZK()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', mainRoute)

app.get("*", (req, res) => {
    res.send("<h1>404 Not Found</h1>")
})

PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
    purgeAliases()
})

// docker compose up --build --scale node-server=3
