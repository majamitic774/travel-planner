import React from "react";
import { post } from "../services/api";

function LogoutButton() {
  async function logout() {
    try {
      await post('/logout', {}, true); // authenticated = true to include token
      localStorage.removeItem('token');
      alert('Logged out!');
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Error:', error);
      alert('Logout failed');
    }
  }

  return <button onClick={logout}>Logout</button>;
}

export default LogoutButton;
