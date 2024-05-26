const express = require('express');
const router = express.Router();
const taskApi = require('./task.api');
const userApi = require('./user.api');

// /api/tasks로 요청이 올 시 taskApi를 호출
router.use('/tasks',taskApi);
router.use('/user', userApi);

module.exports = router;