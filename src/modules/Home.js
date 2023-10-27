import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const navigate = useNavigate(); // Use useNavigate to handle navigation

  useEffect(() => {
    // Fetch the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      // If access token is not available, navigate to the login page
      toast.error("You are logged out right now, please login again", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/login');
      return;
    }

    // Create a config object with headers that include the access token
    const config = {
      headers: {
        'x-access-token': accessToken,
      },
    };

    // Make an Axios GET request with the config to fetch tasks
    axios.get('http://localhost:3052/api/getAllTask', config)
      .then((response) => {
        setTasks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, [navigate]);

// Function to handle adding a new task
const addNewTask = () => {
  // Fetch the access token from local storage
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    toast.error("You are logged out right now, please login again", {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate('/login');
    return;
  }

  // Create a config object with headers that include the access token
  const config = {
    headers: {
      'x-access-token': accessToken,
    },
  };

  // Data for the new task
  const newTaskData = {
    des: newTaskDescription, // Set the description for the new task
  };

  // Make a POST request to create a new task
  axios.post('http://localhost:3052/api/addTask', newTaskData, config)
    .then((response) => {
      // Task added successfully, you can handle the response as needed
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      // Optionally, you can refresh the task list after adding a new task
      refreshTaskList();
    })
    .catch((error) => {
      console.error('Error adding a new task:', error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });
};

  // Function to delete a task by ID
  const deleteTask = (taskId) => {
    // Fetch the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      toast.error("You are logged out right now, please login again", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/login');
      return;
    }

    // Create a config object with headers that include the access token
    const config = {
      headers: {
        'x-access-token': accessToken,
      },
    };

    // Make a DELETE request to delete the task by ID
    axios.delete('http://localhost:3052/api/deleteTask', {
      ...config,
      data: {
        id: taskId,
      },
    })
      .then((response) => {
        // Task deleted successfully, you can handle the response as needed
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Refresh the task list after deleting a task
        refreshTaskList();
      })
      .catch((error) => {
        console.error('Error deleting the task:', error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

   // Function to update a task by ID
   const updateTask = (taskId, updatedDescription) => {
    // Fetch the access token from local storage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      toast.error("You are logged out right now, please login again", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/login');
      return;
    }

    // Create a config object with headers that include the access token
    const config = {
      headers: {
        'x-access-token': accessToken,
      },
    };

    // Data for the task update
    const updatedTaskData = {
      id: taskId,
      des: updatedDescription, // Updated description
    };

    // Make a PUT request to update the task by ID
    axios.put('http://localhost:3052/api/updateTask', updatedTaskData, config)
      .then((response) => {
        // Task updated successfully, you can handle the response as needed
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Refresh the task list after updating the task
        refreshTaskList();
      })
      .catch((error) => {
        console.error('Error updating the task:', error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  // Function to refresh the task list
  const refreshTaskList = () => {
    // Fetch the updated list of tasks
    axios.get('http://localhost:3052/api/getAllTask', {
      headers: {
        'x-access-token': localStorage.getItem('access_token'),
      },
    })
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  };

  return (
    <div>
      <h2>Task List</h2>
      <button onClick={addNewTask}>Add Task</button>
      <input
        type="text"
        placeholder="Enter task description"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      />
      <ul>
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id}>
              <h3>Task ID: {task.id}</h3>
              <p>Description: {task.description}</p>
              <p>Created At: {task.createdAt}</p>
              <p>Updated At: {task.updatedAt}</p>
              <button onClick={() => deleteTask(task.id)}>Delete Task</button>
              <button
                onClick={() => {
                  const updatedDescription = prompt('Enter updated description:', task.description);
                  if (updatedDescription !== null) {
                    updateTask(task.id, updatedDescription);
                  }
                }}
              >
                Update Task
              </button>
              {/* Add a "Read Task" button that navigates to the task details page */}
              <Link to={`/task/${task.id}`}>
                <button>Read Task</button>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
