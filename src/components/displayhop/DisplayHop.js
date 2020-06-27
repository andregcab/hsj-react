import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./displayhop.css";

class DisplayHop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theHop: []
    };
  }

  deleteHop(id) {
    axios
      .post(
        `${process.env.REACT_APP_BASE}/hop/deleteHop/` +
          this.props.hopOwner +
          "/" +
          id
      )
      .then(theHopToDelete => {
        this.props.showJumpAgain();
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderDeleteButton = () => {
    if (this.props.theUser && this.props.jumpOwner === this.props.theUser._id) {
      return (
        <button
          onClick={() => {
            this.deleteHop(this.props.theHopInfo._id);
          }}
        >
          Delete Hop
        </button>
      );
    }
  };

  renderEditButton = () => {
    if (this.props.theUser && this.props.jumpOwner === this.props.theUser._id) {
      return (
        <button>
          <Link
            to={{
              pathname: `/editHop/${this.props.jumpOwner}`,
              state: {
                hopId: this.props.theHopInfo._id,
                POI: this.props.theHopInfo.poi,
                arrivedBy: this.props.theHopInfo.arrivedBy,
                description: this.props.theHopInfo.description
              }
            }}
          >
            Edit This Hop
          </Link>
        </button>
      );
    }
  };

  render() {
    return (
      // <div className="eachSkipsHop">
      <div className="card small">
        <div className="eachhop">
          <h5>Hop:</h5>
          <p>Point Of Intrest: {this.props.theHopInfo.poi}</p>
          <p>Arrived by: {this.props.theHopInfo.arrivedBy}</p>
          <p>What happened: {this.props.theHopInfo.description}</p>
          <Link
            to={{
              pathname: `/editHop/${this.props.jumpOwner}`,
              state: {
                hopId: this.props.theHopInfo._id,
                POI: this.props.theHopInfo.poi,
                arrivedBy: this.props.theHopInfo.arrivedBy,
                description: this.props.theHopInfo.description
              }
            }}
          >
            <i className="material-icons editHopLocation">edit_location</i>
          </Link>

          <i
            className="material-icons deleteHop"
            onClick={() => {
              this.deleteHop(this.props.theHopInfo._id);
            }}
          >
            delete
          </i>
        </div>
      </div>
    );
  }
}

export default DisplayHop;
