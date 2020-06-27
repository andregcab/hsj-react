import React, { Component } from "react";
import axios from "axios";
import "./edithop.css";

class EditHop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poi: this.props.location.state.POI,
      arrivedBy: this.props.location.state.arrivedBy,
      description: this.props.location.state.description
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    axios
      .post(
        `${process.env.REACT_APP_BASE}/hop/updateHop/` +
          this.props.location.state.hopId,
        {
          poi: this.state.poi,
          arrivedBy: this.state.arrivedBy,
          description: this.state.description
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.history.push("/viewJump/" + this.props.match.params.id);
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    // console.log(this.state);
    return (
      <div className="editHop">
        <div className="editHopContent">
          <h3>Edit Hop</h3>
          <form onSubmit={this.handleFormSubmit}>
            <label>Point of Interest</label>
            <input
              type="text"
              name="poi"
              value={this.state.poi}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <label>ArriveBy</label>
            <input
              type="text"
              name="arrivedBy"
              value={this.state.arrivedBy}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={e => {
                this.handleChange(e);
              }}
            />
            <button className="btn saveEditHop" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditHop;
