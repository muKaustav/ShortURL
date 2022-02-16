require('dotenv').config()
const express = require('express')
const { urlPost, urlGet, tokenDelete } = require('../controllers/zkController')

const router = express.Router()

router.post('/url', urlPost)
router.get('/url/:identifier', urlGet)
router.get('/del', tokenDelete)

module.exports = router