import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (formEvent: React.FormEvent): void => {
    formEvent.preventDefault();
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(formEvent) => setUsername(formEvent.target.value)}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(formEvent) => setEmail(formEvent.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(formEvent) => setPassword(formEvent.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Repeat password'
          value={repeatPassword}
          onChange={(formEvent) => setRepeatPassword(formEvent.target.value)}
          required
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
