const cors = require('cors')
const express = require('express')
const mainRoute = require('./routes/main')
require('./mongodb').connect()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', mainRoute)

app.get("*", (req, res) => {
    res.redirect('/')
})

PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log('Node server listening on port %s.', PORT)
})

// docker compose up --build --scale node-server=3
