import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TaskDetails = () => {
  const { taskId } = useParams(); // Get the task ID from the URL
  const [taskDetails, setTaskDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use the useNavigate hook to get access to the navigation function
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        // Fetch the access token from local storage
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          toast.error("You are logged out right now, please login again", {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/login");
          return;
        }

        // Create a config object with headers that include the access token
        const config = {
          headers: {
            "x-access-token": accessToken,
          },
        };

        // Make an Axios GET request to fetch the task details
        const response = await axios.get(`http://localhost:3052/api/readTask?id=${taskId}`, config);

        if (response.data.code === 200) {
          setTaskDetails(response.data.data);
          setLoading(false);
        } else {
          console.error('Error fetching task details:', response.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching task details:', error);
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId, navigate]);

  return (
    <div>
      <h2>Task Details</h2>
      {loading ? (
        <p>Loading task details...</p>
      ) : taskDetails ? (
        <div>
          <p>Task ID: {taskDetails.id}</p>
          <p>Description: {taskDetails.description}</p>
          <p>Created At: {taskDetails.createdAt}</p>
          <p>Updated At: {taskDetails.updatedAt}</p>
        </div>
      ) : (
        <p>Task details not found</p>
      )}
    </div>
  );
};

export default TaskDetails;
