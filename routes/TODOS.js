const express = require('express')
const router = express.Router();
const controller = require('../controller/TODOSController.js')

router.route('/')
    .get(controller.getAllTODOS)
    .post(controller.postTODO)

router.route('/:id')
    .get(controller.getTODOById)
    .put(controller.putTODO)
    .delete(controller.delTODO)



module.exports = router