import axios from "axios";

const API_URL = 'http://localhost:5000/tasks'

const getTasks = async(status) => {
    var response;
    console.log(status);
    if(status) {
        response = await axios.get(API_URL + `?status=${status}`)
    } else {
        response = await axios.get(API_URL);
    }
    return response.data
}

const addTask = async(taskData) => {
    console.log(taskData)
    const response = await axios.post(API_URL, taskData);
    return response.data;
}

const deleteTask = async(taskId) => {
    const response = await axios.delete(API_URL + '/' + taskId);
    return taskId;
}


const updateTask = async(taskData) => {
    console.log('inside updateTask service', taskData);
    const response = await axios.put(API_URL + '/' + taskData._id, taskData);
    return response.data;
}
const taskService = {
    updateTask,
    getTasks, 
    addTask,
    deleteTask,
}

export default taskService