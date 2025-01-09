const asyncHandler = require('express-async-handler');
const validator = require('email-validator');
const User = require('../models/userModel')

// @description:    Creates new user
// @route:          POST /users

const addUser = asyncHandler(async (req, res) => {
    const {name, email} = req.body;

    if(!name || !email) {
        res.status(400);
        throw new Error('Please add all the fields')
    }

    if(!validator.validate(email)) {
        res.status(400);
        throw new Error('Invalid Email Address');
    }
    
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    

    const user = await User.create({
        name,
        email,
    })

    if(user) {
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
        })
    } else {
        res.status(400);
        throw new Error('Invalid User Data')
    }

})

// @description:    Gets all users
// @route:          GET /users
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find();
    res.status(200).json(users);
})

module.exports = {
    addUser,
    getUsers
}