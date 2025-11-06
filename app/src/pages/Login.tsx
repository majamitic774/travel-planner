import React, { useState } from "react";
import { post } from "../services/api";

interface LoginResponse {
  message: string;
  token: string;
  user: any;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ message?: string; user?: any } | null>(null);

  const handleSubmit = async (formEvent: React.FormEvent<HTMLFormElement>): Promise<void> => {
    formEvent.preventDefault();

    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const data = await post<LoginResponse>('login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      setSuccess({ message: data.message, user: data.user });
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
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(formEvent: React.ChangeEvent<HTMLInputElement>) => setEmail(formEvent.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(formEvent: React.ChangeEvent<HTMLInputElement>) => setPassword(formEvent.target.value)}
          required
        />
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <p>{error}</p>}
      {success && (
        <div>
          <p>{success.message}</p>
          {success.user && <p>Welcome, {success.user.email}!</p>}
        </div>
      )}
    </div>
  );
}
