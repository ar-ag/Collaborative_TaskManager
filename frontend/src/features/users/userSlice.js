import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";


const initialState = {
    users:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',
}

export const getUsers = createAsyncThunk('users/getAll', async(_,thunkAPI) => {
    try {
        
        return await userService.getUsers();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const addUser = createAsyncThunk('users/create', async(userData, thunkAPI) => {
    try {
        console.log('inside user Slice')
        return await userService.addUser(userData);
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        reset:(state) => initialState,
    },
    extraReducers:(builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(addUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addUser.fulfilled,(state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users.push(action.payload)
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = userSlice.actions
export default userSlice.reducer