import React, { useState } from "react";
import { signUp } from "../js/auth";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signUp(email, password);
      alert("Sign up successful! Please check your email for verification.");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <section className="container" aria-label="Sign up">
      <h1 style={{ marginBottom: "20px" }} className="h1">
        Create an account
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
      {/* {statusMessage && <p>{statusMessage}</p>} */}
    </section>
  );
};

export default SignupForm;
