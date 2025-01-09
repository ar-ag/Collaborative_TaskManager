import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from '../features/tasks/taskSlice';

const Home = () => {

    const {tasks, isLoading, isError, message} = useSelector((state) => state.tasks)
    const dispatch = useDispatch();
    // const status = 'pending'
    const [status, setStatus] = useState('pending');
    useEffect(() => {
        if(isError) {
            console.log(message);
        }
        dispatch(getTasks(status))
        
    }, [isError, message, dispatch, status])
    console.log(tasks);
  return (
    // <div className="mt-8 p-4 sm:ml-64">
        

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
                    ):tasks.length == 0 ? (
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
                                    {task.assigned_to} 
                                    {/* here only user email is displayed, to display user name, create a backend api to get user by his email
                                    then create a map (task_id -> user name) and populate it by iterating through tasks array and calling getSpecificUser API */}
                                </td>
                                <td className="px-6 py-4">
                                    {task.status}
                                </td>
                                <td className="px-6 py-4">
                                    {task.createdAt}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        ))
                    )}
                    {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17"
                        </th>
                        <td className="px-6 py-4">
                            Silver
                        </td>
                        <td className="px-6 py-4">
                            Laptop
                        </td>
                        <td className="px-6 py-4">
                            $2999
                        </td>
                        <td className="px-6 py-4">
                            $2999
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                        <td className="px-6 py-4 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr> */}
                    
                </tbody>
            </table>
        </div>

    // </div>
  )
}

export default Home