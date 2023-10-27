import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Use the useNavigate hook to get access to the navigation function
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:3052/api/login", {
        email: values.email, // Assuming you use "email" for email
        password: values.password,
      });

      if (response.data.code === 200) {
        console.log("Login successful:", response.data);
        const accessToken = response.data.data.access_token;

        // Save the access token in local storage
        localStorage.setItem("access_token", accessToken);

        // Retrieve the access token from local storage
        const storedAccessToken = localStorage.getItem("access_token");

        console.log("Access Token (retrieved from local storage):", storedAccessToken);

        // You can handle success here, e.g., redirect to a different page
        console.log("Access Token : ", accessToken);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

      // Automatically navigate to the login page after a successful signup
      navigate("/home");

      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error, e.g., display an error message to the user
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red" }}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: "red" }}
            />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
