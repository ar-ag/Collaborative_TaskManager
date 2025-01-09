import axios from "axios";

const API_URL = 'http://localhost:5000/users'

const getUsers = async() => {
   const response = await axios.get(API_URL);
    return response.data
}

const addUser = async(userData) => {
    const response = await axios.post(API_URL, userData);
    console.log('inside user service', response.data);
}

const userService = {
    addUser,
    getUsers, 
    // deleteGoal,
}

export default userService