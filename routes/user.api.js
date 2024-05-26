const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/', userController.createUser);
router.get('/');
router.put('/');
router.delete('/');

module.exports = router;