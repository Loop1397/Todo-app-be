const express = require('express');
const router = express.Router();
const taskApi = require('./task.api');

// /api/tasks로 요청이 올 시 taskApi를 호출
router.use('/tasks',taskApi);

module.exports = router;