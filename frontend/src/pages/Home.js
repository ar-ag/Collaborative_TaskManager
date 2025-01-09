import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, getTasks } from '../features/tasks/taskSlice';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../features/users/userSlice';

const Home = () => {

    const {tasks, isLoading, isError, message} = useSelector((state) => state.tasks)
    const {users, isLoading1, isError1, message1} = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const status = 'pending'
    const [status, setStatus] = useState('pending');

    useEffect(() => {
        if(isError1) {
            console.log(message1);
        }
        dispatch(getUsers());
    }, [isError1, message1, dispatch])

    useEffect(() => {
        if(isError) {
            console.log(message);
        }
        console.log(status);
        dispatch(getTasks(status))
        
    }, [isError, message, dispatch, status])
    console.log(tasks);

    const userMap = new Map();
    console.log(users);
    if (users && users.length > 0) {
        
        users.forEach(user => {
            if(user?.email && user?.name) {
                userMap.set(user.email, user.name); 
            }
            
        });
    }
    
    console.log(userMap);

    const handleDelete = (id) => {
        console.log(id);
        if (window.confirm("Are you sure you want to delete this bill?")) {
            dispatch(deleteTask(id));
            console.log(status);
            dispatch(getTasks(status));
            console.log(tasks);
        }
    };

    const handleEdit = (task) => {
        navigate('/form', {state : {task}})
    }

  return (
    
        

        <div className="mt-8 p-4 sm:ml-64 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Assigned To
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value='pending'>pending</option>
                                <option value='completed'>completed</option>
                            </select>
                            
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="6" className='text-center py-4'>Loading...</td>
                        </tr>
                    ):tasks.length === 0 ? (
                        <tr>
                            <td colSpan="6" className='text-center py-4'>No tasks</td>
                        </tr>
                    ):(
                        tasks.map((task) => (
                            <tr key={task._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {task.title}
                                </th>
                                <td className="px-6 py-4">
                                    {task.description}
                                </td>
                                <td className="px-6 py-4">
                                    <h1>{userMap.get(task.assigned_to)}</h1>
                                    <h1>{task.assigned_to}</h1> 
                                
                                </td>
                                <td className="px-6 py-4">
                                    {task.status}
                                </td>
                                <td className="px-6 py-4">
                                    {task.createdAt}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleEdit(task)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDelete(task._id)} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                
                    
                </tbody>
            </table>
        </div>

    
  )
}

export default Home