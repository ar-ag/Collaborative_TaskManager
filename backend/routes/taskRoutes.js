const express = require('express');
const { addTask, getTasks, updateTask, deleteTask } = require('../controller/taskController');
const router = express.Router();

router.route('/').get(getTasks).post(addTask);
router.route('/:id').put(updateTask).delete(deleteTask)



module.exports = router;