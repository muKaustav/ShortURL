const cors = require('cors')
const express = require('express')
const mainRoute = require('./routes/main')
require('./mongodb').connect()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', mainRoute)

// app.get("*", (req, res) => {
//     res.redirect('/')
// })

PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})

// docker compose up --build --scale node-server=3
