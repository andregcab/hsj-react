import React, { Component } from "react";
// import {Link, NavLink} from 'react-router-dom';
import axios from "axios";
import "materialize-css";
import { Modal, Button, Select } from "react-materialize";
import "./createskip.css";

class CreateSkip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSkipCity: "",
      newSkipArrive: "",
      newSkipDuration: 0,
      newDecription: ""
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    axios
      .post(
        `${process.env.REACT_APP_BASE}/skip/newSkip`,
        {
          skipCity: this.state.newSkipCity,
          skipArrive: this.state.newSkipArrive,
          skipDuration: this.state.newSkipDuration,
          skipDescription: this.state.newSkipDescription,
          theJump: this.props.jumpOwner
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.showJumpAgain();
        this.setState({
          newSkipCity: "",
          newSkipArrive: "",
          newSkipDuration: 0,
          newSkipDescription: ""
        });
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div>
          <Button href="#createSkip" className="modal-trigger createNewSkip">
            Create new Skip
          </Button>
          <Modal id="createSkip">
            <div className="createSkipContent">
              <h3>Create Skip</h3>
              <div className="createSkip">
                <form onSubmit={this.handleFormSubmit}>
                  <div className="createSkip-input-field input-field col s12">
                    <input
                      id="city"
                      type="text"
                      className="validate"
                      name="newSkipCity"
                      value={this.state.newSkipCity}
                      onChange={e => this.handleChange(e)}
                      required
                    />
                    <label htmlFor="city">City</label>
                  </div>

                  {/* <div className="input-field col s12">
                <input id="arriveBy" type="text" className="validate" name="newSkipArrive" value={this.state.newSkipArrive} onChange={e => this.handleChange(e)} required/>
                <label htmlFor="arriveBy">Arrived By</label>
              </div> */}

                  <Select
                    className="arriveSelect"
                    name="newSkipArrive"
                    onChange={this.handleChange}
                    required
                  >
                    <option className="arriveOption" value="" active="true">
                      Arrived By:
                    </option>
                    <option value="Car">Car</option>
                    <option value="Train">Train</option>
                    <option value="Boat">Boat</option>
                  </Select>

                  <div className="createSkip-input-field input-field col s12">
                    <input
                      id="skipDuration"
                      type="number"
                      className="validate"
                      name="newSkipDuration"
                      value={this.state.newSkipDuration}
                      onChange={e => this.handleChange(e)}
                      required
                    />
                    <label htmlFor="skipduration">Duration</label>
                  </div>

                  <div className="createSkip-input-field input-field col s12">
                    <textarea
                      id="textarea3"
                      className="materialize-textarea descriptionTextArea"
                      name="newSkipDescription"
                      value={this.state.newSkipDescription}
                      onChange={e => this.handleChange(e)}
                      required
                    />
                    <label htmlFor="textarea3">Describe Your Adventure</label>
                  </div>
                  <button className="addSkip btn modal-close">Add Skip</button>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default CreateSkip;
