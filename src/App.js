import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthService from "./services/AuthService.js";
import Navbar from "./components/navbar/Navbar.js";
import HomePage from "./components/homepage/HomePage.js";
import UserHomePage from "./components/userhomepage/UserHomepage.js";
import AllUserJumps from "./components/alluserjumps/AllUserJumps.js";
import CreateJump from "./components/createjump/CreateJump.js";
import AllJumps from "./components/alljumps/AllJumps.js";
import ViewJump from "./components/viewjump/ViewJump";
import EditJump from "./components/editjump/EditJump";
import EditSkip from "./components/editskip/EditSkip";
import EditHop from "./components/editHop/EditHop";

//testingg

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyLoggedIn: null,
      ready: false
    };
    //this is important! it gets the AuthService class from Authservice.js
    //basically it allows us to use the signup/login/getcurrentuser/logout routes from
    //the backend
    this.service = new AuthService();
  }

  getCurrentlyLoggedInUser = f => {
    this.service
      .currentUser()
      .then(theUser => {
        this.setState({ currentlyLoggedIn: theUser }, () => {
          if (f) {
            f();
          }
        });
      })
      .catch(() => {
        this.setState({ currentlyLoggedIn: null });
      });
  };

  componentDidMount() {
    this.getCurrentlyLoggedInUser();
  }

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => (
            <Navbar
              {...props}
              theUser={this.state.currentlyLoggedIn}
              pleaseLogOut={() => this.service.logout()}
              // toggleForm = {this.toggleForm}
              getUser={this.getCurrentlyLoggedInUser}
            />
          )}
        />

        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <HomePage {...props} theUser={this.state.currentlyLoggedIn} />
            )}
          />
          <Route
            exact
            path="/userHomepage"
            render={props => {
              if (this.state.currentlyLoggedIn)
                return (
                  <UserHomePage
                    {...props}
                    theUser={this.state.currentlyLoggedIn}
                    ready={this.state.ready}
                  />
                );
              else return <Redirect to="/" />;
            }}
          />
          <Route
            exact
            path="/allUserJumps"
            render={props => (
              <AllUserJumps
                {...props}
                theUser={this.state.currentlyLoggedIn}
                ready={this.state.ready}
              />
            )}
          />
          <Route
            exact
            path="/viewJump/:id"
            render={props => (
              <ViewJump
                {...props}
                theUser={this.state.currentlyLoggedIn}
                ready={this.state.ready}
              />
            )}
          />
          <Route
            exact
            path="/createJump"
            render={props => (
              <CreateJump
                {...props}
                theUser={this.state.currentlyLoggedIn}
                ready={this.state.ready}
              />
            )}
          />
          <Route
            exact
            path="/allJumps"
            render={props => (
              <AllJumps
                {...props}
                theUser={this.state.currentlyLoggedIn}
                ready={this.state.ready}
              />
            )}
          />
          <Route
            exact
            path="/editJump/:id"
            render={props => (
              <EditJump
                {...props}
                theUser={this.state.currentlyLoggedIn}
                ready={this.state.ready}
              />
            )}
          />
          <Route
            exact
            path="/editSkip/:id"
            render={props => (
              <EditSkip
                {...props}
                theUser={this.state.currentlyLoggedIn}
                ready={this.state.ready}
              />
            )}
          />
          <Route
            exact
            path="/editHop/:id"
            render={props => (
              <EditHop
                {...props}
                theUser={this.state.currentlyLoggedIn}
                ready={this.state.ready}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
