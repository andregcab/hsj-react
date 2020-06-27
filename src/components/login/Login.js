import React, { Component } from "react";
import AuthService from "../../services/AuthService";
import "materialize-css";
import { Modal, Button } from "react-materialize";
import("./login.css");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { usernameInput: "", passwordInput: "" };
    this.service = new AuthService();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  tryToLogin = e => {
    e.preventDefault();
    const uName = this.state.usernameInput;
    const pWord = this.state.passwordInput;

    this.service.login(uName, pWord).then(() => {
      this.props.getUser(() => {
        this.props.history.push("/userHomepage");
      });
    });
  };

  render() {
    return (
      <div>
        <Button href="#loginModal" className="loginBtn modal-trigger">
          Log In
        </Button>
        <Modal id="loginModal">
          <h5>Login</h5>
          <form onSubmit={this.tryToLogin}>
            <div className="login-input-field input-field col s6">
              <i className="material-icons prefix">account_circle</i>
              <input
                id="loginIcon"
                type="text"
                className="validate"
                autoComplete="username"
                value={this.state.usernameInput}
                name="usernameInput"
                onChange={this.handleChange}
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
                value={this.state.passwordInput}
                name="passwordInput"
                onChange={this.handleChange}
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
  }
}

export default Login;
