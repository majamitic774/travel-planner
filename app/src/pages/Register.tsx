import React, { useState } from "react";

import { post } from "../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    message?: string;
    data?: unknown;
  } | null>(null);

  const handleSubmit = async (
    formEvent: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    formEvent.preventDefault();

    if (password !== repeatPassword) {
      setError("Password are not same.");

      return;
    }

    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const response = await post<{ message?: string; data?: unknown }>(
        "register",
        {
          username,
          email,
          password,
          password_confirmation: repeatPassword,
        }
      );

      setSuccess(response);
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Unexpected error";

      setError(message);
    } finally {
      setIsSubmitting(false);
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
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Register"}
        </button>
      </form>
      {error && <p>{error}</p>}
      {success && <div>{success.message && <p>{success.message}</p>}</div>}
    </div>
  );
};

export default Register;
