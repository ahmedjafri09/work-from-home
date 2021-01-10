import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import Axios from "../axios/axios";

//schema for validation of formik form
const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username is too short")
    .max(50, "Username is too long")
    .required("Username Required"),
  password: Yup.string()
    .min(5, "Password is too short")
    .max(18, "Password is too long")
    .required("Password Required"),
});

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userFound, setUserFound] = useState(false);

  const handleLogin = async () => {
    const result = await Axios.post("auth/login", {
      username,
      password,
    });
    console.log("access token from login");
    const { accessToken } = result.data;
    if (accessToken) {
      setToken(accessToken);
      setUserFound(true);
    }
  };
  return (
    <div className="joinInnerContainer">
      <h1 className="heading">Enter ChatApp</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={() => handleLogin()}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="username"
              placeholder="Username"
              className="joinInput"
              type="text"
              onKeyUp={(e) => setUsername(e.target.value)}
            />
            {errors.username && touched.username ? (
              <div className="status">{errors.username}</div>
            ) : null}
            <Field
              name="password"
              placeholder="Password"
              className="joinInput mt-20"
              type="password"
              onKeyUp={(e) => setPassword(e.target.value)}
            />
            {errors.password && touched.password ? (
              <div className="status"> {errors.password}</div>
            ) : null}
            <button type="submit" className="button mt-20">
              Sign in
            </button>
          </Form>
        )}
      </Formik>
      {userFound ? <Redirect to={`/profile?${username}`} /> : null}
    </div>
  );
};

export default Login;
