import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./register-login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.status === 200) {
        console.log(data.message); // Success message
        localStorage.setItem('token', data.token);
        navigate('/profilePage');
      } else if (response.status === 400) {
        console.error(data.error); // Error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="background">
      <section id="container">
        <section id="content">
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <br />
            <br />
            <label>
              <button type="submit">Login</button>
            </label>
            <br />
            <br />
            <label>
              <a href="/register">Not enrolled yet?</a>
            </label>
          </form>
        </section>
      </section>
    </div>
  );
}
