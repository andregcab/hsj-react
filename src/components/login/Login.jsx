import React, { useState, useEffect } from "react";
import AuthService from "../../services/AuthService";
import "materialize-css";
import { Modal, Button } from "react-materialize";
import "./login.css";

const Login = ({ getUser, history }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const service = new AuthService();

  const tryToLogin = (e) => {
    e.preventDefault();
    const uName = usernameInput;
    const pWord = passwordInput;
    service.login(uName, pWord).then(() => {
      getUser(() => {
        history.push("/userHomepage");
      });
    });
  };

  return (
    <div>
      <Button href="#loginModal" className="loginBtn modal-trigger">
        Log In
      </Button>
      <Modal id="loginModal">
        <h5>Login</h5>
        <form onSubmit={tryToLogin}>
          <div className="login-input-field input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="loginIcon"
              type="text"
              className="validate"
              autoComplete="username"
              value={usernameInput}
              name="usernameInput"
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <label htmlFor="loginIcon">First Name</label>
          </div>

          <div className="login-input-field input-field col s6">
            <i className="material-icons prefix">lock</i>
            <input
              id="icon_lock"
              type="password"
              className="validate"
              autoComplete="current-password"
              value={passwordInput}
              name="passwordInput"
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <label htmlFor="icon_lock">Password</label>
          </div>
          <button
            type="submit"
            className="accountLogin btn #5CA4A9 modal-close"
          >
            Login
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
