import axios from "axios";

const API_URL = 'http://localhost:5000/users'

const getUsers = async() => {
   const response = await axios.get(API_URL);
    return response.data
}



const userService = {
    // createGoal,
    getUsers, 
    // deleteGoal,
}

export default userService