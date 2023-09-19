import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
    age: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
    phone_number: Yup.string().required("Phone number is required"),
    age: Yup.number().required("Age is required").positive("Age must be positive"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://127.0.0.1:3032/api/users", {
        user_name: values.name,
        email: values.email,
        password: values.password,
        phone_number: values.phone_number,
        age: values.age,
      });

      if (response.status === 200) {
        console.log("User created successfully:", response.data);
        // You can handle success here, e.g., redirect to a different page
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error, e.g., display an error message to the user
      toast.error("Error creating user", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" style={{ color: 'red' }}/>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" style={{ color: 'red' }}/>
          </div>
          <div>
            <label htmlFor="phone_number">Phone Number:</label>
            <Field type="text" id="phone_number" name="phone_number" />
            <ErrorMessage name="phone_number" component="div" style={{ color: 'red' }}/>
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <Field type="number" id="age" name="age" />
            <ErrorMessage name="age" component="div" style={{ color: 'red' }}/>
          </div>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUp;
