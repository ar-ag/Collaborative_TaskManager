const asyncHandler = require('express-async-handler');
const validator = require('email-validator');
const Tasks = require('../models/taskModel');
const User = require('../models/userModel');
const { response } = require('express');

// @description:    Creates new task
// @route:          POST /tasks
const addTask = asyncHandler(async(req, res) => {
    const {title, description, assigned_to} = req.body;


    if(!title || !assigned_to) {
        res.status(400);
        throw new Error('Please add required fields')
    }

    if(!validator.validate(assigned_to)) {
        res.status(400);
        throw new Error('Invalid User Email Address');
    }

    const userExists = await User.findOne({email:assigned_to});
    if(!userExists) {
        res.status(400);
        throw new Error('User not found');
    }

    const task = await Tasks.create({
        title,
        description,
        assigned_to,
    })

    if(task) {
        res.status(201).json({
            _id:task.id,
            title:task.title,
            description:task.description,
            assigned_to:task.assigned_to,
            status:task.status
        })
    }
})

// @description:    Gets tasks filtered by status
// @route:          GET /users
const getTasks = asyncHandler(async(req, res) => {
    const query_param = req.query.status;
    var tasks = [];
    
    if(!query_param) {
        tasks = await Tasks.find();
    } else if(!query_param.match('completed') && !query_param.match('pending')){
        res.status(400);
        throw new Error('Invalid status')
    } else {
        tasks = await Tasks.find({
            status: query_param
        })
    }

    res.status(200).json(tasks);
    
})

// @description:    Updates a task
// @route:          PUT /tasks/:id
const updateTask = asyncHandler(async(req, res) => {
    const taskId = req.params.id;
    const task = await Tasks.findById(taskId);
    
    if(!task) {
        res.status(400);
        throw new Error('task not found')
    }

    const updatedTask = await Tasks.findByIdAndUpdate(taskId, req.body, {
        new:true,
        runValidators: true
    })

    if(updatedTask) {
        res.status(200).json(updatedTask);
    } else {
        res.status(400);
        throw new Error('Invalid Task Data')
    }

})

// @description:    Deletes a task
// @route:          DELETE /tasks/:id
const deleteTask = asyncHandler(async(req, res) => {
    const taskId = req.params.id;
    const task = await Tasks.findById(taskId);

    if(!task) {
        res.status(400);
        throw new Error('task not found')
    }

    const deletedTask = await Tasks.findByIdAndDelete(taskId);
    res.status(200).json(deletedTask);
})

module.exports = {
    addTask,
    getTasks,
    updateTask,
    deleteTask
}