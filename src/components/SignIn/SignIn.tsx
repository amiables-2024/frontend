import React, { useState } from 'react';
import './Form.css';
import axios, { AxiosError } from 'axios';

const SignIn = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, login);
      console.log('SignIn Success:', response.data);
      // TODO: Handle success, set session token and redirect to personal dashboard page
      sessionStorage.setItem("accessToken", response.data.access_token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('SignIn Error:', error.response?.data);
        // TODO: Handle error, display some error message detailing user not found
      } else {
        // Handle non-Axios errors
        console.error('SignIn Error:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Sign In</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={login.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={login.password}
        onChange={handleChange}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
