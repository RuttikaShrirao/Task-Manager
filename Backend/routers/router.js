const express = require("express");
const router = express.Router()
const {gettingData,sendingData}= require('../controller/controller')

router.route('/').get(gettingData)
router.route('/sendData').get(sendingData)

module.exports=router