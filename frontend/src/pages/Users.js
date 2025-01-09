import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUsers } from '../features/users/userSlice';
import { useNavigate } from 'react-router-dom';


const Users = () => {
    const [openForm, setOpenForm] = useState(false);
    const {users, isLoading, isError, message} = useSelector((state) => state.users);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
            if(isError) {
                console.log(message);
            }
            dispatch(getUsers());
        }, [isError, message, dispatch])
        console.log(users);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {name, email};
        console.log('inside page', userData);
        dispatch(addUser(userData))
        setOpenForm(!openForm);
        navigate('/');
    }
  return (

    <div className="mt-10 p-4 sm:ml-96 relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        User Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        User Email
                    </th>
                    
                </tr>
            </thead>
            <tbody>


                {isLoading ? (
                        <tr>
                            <td colSpan="2" className='text-center py-4'>Loading...</td>
                        </tr>
                    ):users.length === 0 ? (
                        <tr>
                            <td colSpan="2" className='text-center py-4'>No Users</td>
                        </tr>
                    ):(
                        users.map((user) => (
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                
                            </tr> 
                        ))
                    )}
                
            </tbody>
        </table>
    

    

        
        <button onClick={() => setOpenForm(!openForm)} className="block mt-16 mx-72 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Add User
        </button>

        <div className={`${openForm ? 'visible opacity-100' : 'invisible opacity-0'} fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity`}></div>
            
        <div id="crud-modal" tabindex="-1" className={`${openForm ? 'visible opacity-100' : 'invisible opacity-0'} fixed z-50 inset-0 flex justify-center items-center transition-opacity`}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Create New Product
                        </h3>
                        <button type="button" onClick={() => setOpenForm(!openForm)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Name</label>
                                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type user name" required="" />
                            </div>
                            <div className="col-span-2">
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type user email" required="" />
                            </div>
                            
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Add new user
                        </button>
                    </form>
                </div>
            </div>
        </div> 
        </div>

        

  )
}

export default Users

