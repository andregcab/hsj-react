import React, { Component } from "react";
// import {Link, NavLink} from 'react-router-dom';
import axios from "axios";
// import Hop from "../createhop/CreateHop.js";
// import CreateSkip from "../createskip/CreateSkip.js";
import("./createjump.css");

class CreateJump extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newStart: "",
      newEnd: "",
      newDuration: "",
      newDescription: "",
      createSkipVisible: false,
      createHopVisible: false,
      newImage: null
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();

    let newJump = new FormData();
    newJump.append("theImageParameter", this.state.newImage);
    newJump.append("startCity", this.state.newStart);
    newJump.append("endCity", this.state.newEnd);
    newJump.append("jumpDuration", this.state.newDuration);
    newJump.append("jumpDescription", this.state.newDescription);
    // console.log(this.state);
    axios
      .post(`${process.env.REACT_APP_BASE}/jump/newJump`, newJump, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      .then(theCreatedJump => {
        this.props.history.push("/viewJump/" + theCreatedJump.data._id);
        // this.props.getData();
        //this function updates something
        this.setState({
          newStart: "",
          newEnd: "",
          newDuration: 0,
          newDescription: ""
        });
      })
      .catch(error => console.log(error));
  };

  

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log(this.state)
  };

  updateFileInState = e => {
    this.setState({ newImage: e.target.files[0] });
  };

  onClick() {
    this.setState({ createSkipVisible: !this.state.createSkipVisible });
  }
  onClick2() {
    this.setState({ createHopVisible: !this.state.createHopVisible });
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <div className="createJump" />
        <div className="move">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field col s6 createJumpInput">
              <i id="plane" className="material-icons prefix ">
                airplanemode_active
              </i>
              <input
                id="icon_plane"
                type="text"
                className="validate"
                name="newStart"
                value={this.state.newStart}
                onChange={e => this.handleChange(e)}
                required
              />
              <label htmlFor="icon_plane">City of departure</label>
            </div>

            <div className="input-field col s6 createJumpInput">
              <i id="plane" className="material-icons prefix">
                airplanemode_active
              </i>
              <input
                id="icon_plane2"
                type="text"
                className="validate"
                name="newEnd"
                value={this.state.newEnd}
                onChange={e => this.handleChange(e)}
                required
              />
              <label htmlFor="icon_plane2">City of arrival </label>
            </div>

            <div className="input-field col s12 createJumpInput">
              <input
                id="duration"
                type="number"
                className="validate"
                name="newDuration"
                value={this.state.newDuration}
                onChange={e => this.handleChange(e)}
                required
              />
              <label htmlFor="duration">Duration (in days)</label>
            </div>

            <div className="input-field col s12 createJumpInput">
              <textarea
                id="textarea1"
                className="materialize-textarea"
                name="newDescription"
                value={this.state.newDescription}
                onChange={e => this.handleChange(e)}
                required
              />
              <label htmlFor="textarea1">Description</label>
            </div>
    
              <div className="buttonsCenter">
            {/* <div className="input-field col s12"> */}
            <div className="file-field input-field">
              <legend className="addImage" style={{ marginTop: "20px" }}>Add a Picture</legend>
              <input type="file" onChange={this.updateFileInState} />
              </div>
            {/* </div> */}
            <button className="btn createJumpBtn">Create Jump</button>
            </div>
            
          </form>
        </div>

        {/* <div>
          <div>
            <button className="btn-floating btn-small  black">
              <i className="material-icons" onClick={() => this.onClick()}>
                add
              </i>
            </button>
            {this.state.createSkipVisible ? <CreateSkip /> : null}
          </div> */}

          {/* <div>
            <button className="btn-floating btn-small  black"><i className="material-icons"  onClick={() => this.onClick()}>add</i></button>
            {this.state.createSkipVisible ? <CreateSkip/>: null}
            </div> */}
        {/* </div> */}

        {/* <div>
          <div>
            <button className="btn-floating btn-small  green">
              <i className="material-icons" onClick={() => this.onClick2()}>
                add
              </i>
            </button>
            {this.state.createHopVisible ? <Hop /> : null}
          </div>
        </div> */}
      </div>
    );
  }
}

export default CreateJump;
