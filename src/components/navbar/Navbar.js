import React, { Component } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import Login from "../login/Login";
import Signup from "../signup/Signup";
// import { Dropdown, Button } from 'react-materialize';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginShowing: false,
      signupShowing: false,
      
    };
  }

  doTheLogout = () => {
    this.props.pleaseLogOut().then(() => {
      this.props.getUser();
      this.props.history.push("/");
    });
  };

  toggleForm = whichForm => {
    let theForm;

    if (whichForm === "signup") {
      theForm = "signupShowing";
    } else if (whichForm === "login") {
      theForm = "loginShowing";
    }

    this.setState({ [theForm]: !this.state[theForm] });
  };

  render() {
    return (
      <div className="HomePage">
        <nav className="transparent">
          <div className="nav-wrapper">
            <Link to="/">
              <img
                src="/images/hsjLogo.png"
                alt="HSJLOGO"
                className="brand-logo center"
              />
            </Link>
            <ul>
              {this.props.theUser && (
                <li>
                  <Link to="/userHomepage" className="userHomePage">
                    {this.props.theUser.username}'s profile
                  </Link>
                </li>
              )}
              {this.state.signupShowing && (
                <Signup
                  getUser={this.getCurrentlyLoggedInUser}
                  toggleForm={this.toggleForm}
                />
              )}
              {!this.props.theUser && (
                <div>
                {/* <Dropdown trigger={<Button>Drop Me</Button>}> */}
                <li>
                    <Login {...this.props} getUser={this.props.getUser} />
                  </li>
                  <li>
                    <Signup {...this.props} getUser={this.props.getUser} />
                  </li>
                {/* </Dropdown> */}
                </div>
              )}
              {this.props.theUser && (
                <button className="btn logOutBtn" onClick={this.doTheLogout}>
                  Log Out{" "}
                </button>
              )}
            </ul>
          </div>
        </nav>
      </div>

      // Andre's original code
      // <nav>
      //     {/* {props.theUser &&
      // <Link to="/projects" style={{ textDecoration: 'none', margin: '10px' }}>Projects</Link>
      //     } */}
      // {!props.theUser &&
      // <span>
      // <button onClick = {()=> props.toggleForm('login')} > Login </button>
      // <button onClick = {()=> props.toggleForm('signup')}>Sign Up</button>
      // </span>
      // }
      // {props.theUser &&
      // <span>
      // <button onClick = {doTheLogout} >Log Out </button>
      // <span>Hello, {props.theUser.username}</span>
      // </span>
      // }
      // </nav>
    );
  }
}

export default Navbar;
