const express = require('express')
const router = express.Router();
const controller = require('../controller/TODOSController.js')

router.route('/')
    .get(controller.getAllTODOS)





module.exports = router