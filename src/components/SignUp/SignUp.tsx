import React, { useState } from 'react';
import './Form.css';
import axios, { AxiosError } from 'axios';

const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, );
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
  };

  return (
      <div>
          <form onSubmit={handleSubmit} className="form-container">
              <h2>Sign Up</h2>
              <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
              />
              <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
              />
              <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
              />
              <button type="submit">Sign Up</button>
          </form>
      </div>

  );
};

export default SignUp;
