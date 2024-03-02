import React, { useState } from 'react';
import './Form.css';
import axios, { AxiosError } from 'axios';

const SignUp = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://URL/auth/register', user);
      console.log('SignUp Success:', response.data);
      // TODO: Handle success, set session token and redirect to personal dashboard page
      sessionStorage.setItem("accessToken", response.data.access_token);  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('SignUp Error:', error.response?.data);
        // TODO: Handle error, display some error message detailing what failed
      } else {
        // Handle non-Axios errors
        console.error('SignUp Error:', error);
      }
    }
    console.log(user);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Sign Up</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={user.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
