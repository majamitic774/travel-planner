import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (formEvent: React.FormEvent): Promise<void> => {
    formEvent.preventDefault();

    try {
      const queryParams = new URLSearchParams({
        username,
        email,
        password,
        repeatPassword,
      });

      const response = await fetch(`/api/test-connection?${queryParams}`);
      const data = await response.json();

      console.log("Response from Laravel:", data);
      alert(`Laravel responded: ${data.message}`);
    } catch (error) {
      console.error("Error connecting to Laravel:", error);
      alert("Failed to connect to Laravel");
    }
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
