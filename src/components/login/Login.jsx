import React, { useState } from "react";
import { Modal, Button } from "react-materialize";
import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthService";

import "materialize-css";
import "./login.css";

const Login = ({ getUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const service = new AuthService();
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    service.login(username, password).then(() => {
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
        <form onSubmit={login}>
          <div className="login-input-field input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="loginIcon"
              type="text"
              className="validate"
              autoComplete="username"
              value={username}
              name="usernameInput"
              onChange={(event) => setUsername(event.target.value)}
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
              value={password}
              name="passwordInput"
              onChange={(event) => setPassword(event.target.value)}
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
