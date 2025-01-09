import axios from "axios";

// const API_URL = 'http://localhost:5000/users'
console.log(process.env);
const API_URL = process.env.REACT_APP_API_URL + 'users';
// const API_URL = 'https://9194-2405-201-8002-62ee-4191-7b79-98bd-eb41.ngrok-free.app/users'
console.log(API_URL)
const getUsers = async() => {
    const response = await axios.get(API_URL, {
        headers: {
            'ngrok-skip-browser-warning': '69420',
        },
    });
    return response.data
}

const addUser = async(userData) => {
    const response = await axios.post(API_URL, userData, {
        headers: {
            'ngrok-skip-browser-warning': '69420',
        }
    });
    console.log('inside user service', response.data);
}

const userService = {
    addUser,
    getUsers, 
    
}

export default userService