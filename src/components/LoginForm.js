import React, { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLengthValid = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  const isPasswordStrong =
    isLengthValid &&
    hasUpperCase &&
    hasNumber &&
    hasSpecialChar;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted!");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2>Login Form</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <br /><br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <p>{isLengthValid ? "✅" : "❌"} At least 8 characters</p>
            <p>{hasUpperCase ? "✅" : "❌"} One uppercase letter</p>
            <p>{hasNumber ? "✅" : "❌"} One number</p>
            <p>{hasSpecialChar ? "✅" : "❌"} One special character</p>
          </div>

          <button type="submit" disabled={!isPasswordStrong}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
