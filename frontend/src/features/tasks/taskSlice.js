import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";


const initialState = {
    tasks:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',
}

export const addTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
    try {
        console.log('inside bill Slice')
        return await taskService.addTask(taskData);
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getTasks = createAsyncThunk('tasks/getAll', async(status,thunkAPI) => {
    try {
        
        return await taskService.getTasks(status);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
    try {
        return await taskService.deleteTask(id)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const updateTask = createAsyncThunk('tasks/update', async (taskData, thunkAPI) => {
    try {
        return await taskService.updateTask(taskData)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const taskSlice = createSlice({
    name:'task',
    initialState,
    reducers:{
        reset: (state) => initialState,
    },
    extraReducers:(builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addTask.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks.push(action.payload)
            })
            .addCase(addTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTasks.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = action.payload
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTask.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = state.tasks.filter((task) => task._id !== action.payload)
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                const index = state.tasks.findIndex((task) => task._id === action.payload._id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
})

export const {reset} = taskSlice.actions
export default taskSlice.reducer