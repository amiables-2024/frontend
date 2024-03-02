import React, { useState } from 'react';
import './Form.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the sign-in logic here
    console.log(login);
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
