import axios from "axios";
// import dotenv from 'dotenv';
// dotenv.config();
// const API_URL = 'http://localhost:5000/tasks'
// const API_URL = process.env.REACT_APP_API_URL + '/tasks';
const API_URL = 'https://9194-2405-201-8002-62ee-4191-7b79-98bd-eb41.ngrok-free.app/tasks';
const getTasks = async(status) => {
    var response;
    console.log(status);
    if(status) {
        response = await axios.get(API_URL + `?status=${status}`, {
            headers: {
                'ngrok-skip-browser-warning': '69420',
            }
        })
    } else {
        response = await axios.get(API_URL, {
            headers: {
                'ngrok-skip-browser-warning': '69420',
            }
        });
    }
    return response.data
}

const addTask = async(taskData) => {
    console.log(taskData)
    const response = await axios.post(API_URL, taskData, {
        headers: {
            'ngrok-skip-browser-warning': '69420',
        }
    });
    return response.data;
}

const deleteTask = async(taskId) => {
    const response = await axios.delete(API_URL + '/' + taskId, {

        headers: {
            'ngrok-skip-browser-warning': '69420',
        }
    });
    return taskId;
}


const updateTask = async(taskData) => {
    console.log('inside updateTask service', taskData);
    const response = await axios.put(API_URL + '/' + taskData._id, taskData, {
        headers: {
            'ngrok-skip-browser-warning': '69420',
        }
    });
    return response.data;
}
const taskService = {
    updateTask,
    getTasks, 
    addTask,
    deleteTask,
}

export default taskService