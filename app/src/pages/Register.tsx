import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (FormEvent: React.FormEvent) => {
    FormEvent.preventDefault();
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(FormEvent) => setUsername(FormEvent.target.value)}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(FormEvent) => setEmail(FormEvent.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(FormEvent) => setPassword(FormEvent.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Repeat password'
          value={repeatPassword}
          onChange={(FormEvent) => setRepeatPassword(FormEvent.target.value)}
          required
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
