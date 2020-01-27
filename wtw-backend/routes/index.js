const express = require('express');
const userController = require('../controllers/user.controller');
const sessionController = require('../controllers/session.controller');

var router = express.Router();

router.post('/api/user',userController.create);
router.get('/api/user',userController.readAll);
router.get('/api/user/:id',userController.readOne);

router.post('/api/session',sessionController.create);
router.get('/api/session/:id',sessionController.readForOneUser);


module.exports = router;
