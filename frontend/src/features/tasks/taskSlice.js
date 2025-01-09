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

// export const deleteBill = createAsyncThunk('bills/delete', async (id, thunkAPI) => {
//     try {
//         return await billService.deleteBill(id)
//     } catch(error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })


// export const updateBill = createAsyncThunk('bills/update', async (updatedBill, thunkAPI) => {
//     try {
//         return await billService.updateBill(updatedBill)
//     } catch(error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })


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
                // console.log('before adding the bill', state);
                state.tasks.push(action.payload)
                // console.log('inside extraReducer', state.bills);
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
            // .addCase(deleteBill.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(deleteBill.fulfilled,(state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.bills = state.bills.filter((bill) => bill._id !== action.payload)
            // })
            // .addCase(deleteBill.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
            // })
            // .addCase(updateBill.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(updateBill.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;

            //     // Replace the updated bill in the array
            //     const index = state.bills.findIndex((bill) => bill.id === action.payload.id);
            //     if (index !== -1) {
            //         state.bills[index] = action.payload;
            //     }
            // })
            // .addCase(updateBill.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.message = action.payload;
            // });
    }
})

export const {reset} = taskSlice.actions
export default taskSlice.reducer