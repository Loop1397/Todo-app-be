const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// 회원가입
router.post('/', userController.createUser);
// 로그인
router.post('/login', userController.loginWithEmail);
router.get('/');
router.put('/');
router.delete('/');

module.exports = router;