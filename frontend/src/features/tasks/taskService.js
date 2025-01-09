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



const taskService = {
    // createGoal,
    getTasks, 
    addTask,
    // deleteGoal,
}

export default taskService