import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { getUsers } from '../features/users/userSlice';
import { addTask, updateTask } from '../features/tasks/taskSlice';

const Form = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {users, isLoading, isError, message} = useSelector((state) => state.users);
    const {tasks, isLoading1, isError1, message1} = useSelector((state) => state.tasks);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [user, setUser] = useState('');

    const taskToEdit = location.state?.task;

    useEffect(() => {
        if(isError) {
            console.log(message);
        }
        dispatch(getUsers());

        if(taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setUser(taskToEdit.assigned_to);
            setStatus(taskToEdit.status);
        }
    }, [isError, message, dispatch])
    console.log(users);

    const handleSubmit = (e) => {
        e.preventDefault();
        var taskData;
        if(taskToEdit) {
            taskData = {_id : taskToEdit._id, title, description, assigned_to:user, status};
            dispatch(updateTask(taskData));
        } else {
            taskData = {title, description, assigned_to:user};
            dispatch(addTask(taskData))
        }
        
        
        setTitle('');
        setDescription('');
        setUser('');
        navigate('/');
    }

    const handleStatusChange = () => {
        const updatedStatus = status === 'pending' ? 'completed' : 'pending';
        setStatus(updatedStatus);

    }
    
  return (
    

    <form onSubmit={handleSubmit} class="mt-16 sm:mt-8 p-4 max-w-md mx-auto">
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_title" id="floating_title" value={title} onChange={(e) => setTitle(e.target.value)} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_title" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <label for="description" class="block my-2 text-sm text-gray-500 dark:text-gray-400">Description</label>
        <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add Description..."></textarea>
    </div>
    <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="assigned_to" className="block mb-2 text-sm font-medium text-gray-500 dark:text-white">Assign To</label>
                <select
                    id="assigned_to"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                >
                    <option value="" disabled>
                        Select a user
                    </option>
                    
                    {users.length === 0 ? (
                        <span>No Added User</span>
                    ) : (
                        users.map((u) => (
                            <option key={u._id} value={u.email}>
                                {`${u.name} ${''.repeat(40 - u.name.length - u.email.length)}-- ${u.email}`}
                            </option>
                        ))
                    )

                    }
                    
                </select>
            </div>



            {
                taskToEdit?(
                    <div class="flex items-start mb-5">
                        <div class="flex items-center h-5">
                        <input id="status" type="checkbox" checked={status === "completed"} onChange={handleStatusChange} class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label for="status" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Completed</label>
                    </div>
                ):(
                    <></>
                )
            }
        
    <button type="submit"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>

  )
}

export default Form