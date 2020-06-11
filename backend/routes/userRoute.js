const express = require('express')
const router = express.Router()
const userCtrl = require("../controller/user")
const multer = require('../middleware/multer-config')



router.post("/register",multer, userCtrl.signin )

router.post("/login", userCtrl.login)

module.exports = router