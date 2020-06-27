import React, { Component } from "react";
import DisplayHop from "../displayhop/DisplayHop.js";
import CreateHop from "../createhop/CreateHop.js";
import { Link } from "react-router-dom";
import axios from "axios";
import "./displayskip.css";

class DisplaySkip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theSkip: this.props.theSkipInfo,
      editable: false
    };
  }

  renderHops() {
    if (this.props.theSkipInfo.hop) {
      return this.props.theSkipInfo.hop.map(hop => {
        return (
          <DisplayHop
            key={hop._id}
            theHopInfo={hop}
            theUser={this.props.theUser}
            hopOwner={this.props.theSkipInfo._id}
            jumpOwner={this.props.jumpId}
            showJumpAgain={this.props.showJumpAgain}
          />
        );
      });
    } else {
      return null;
    }
  }

  renderHopAdd() {
    if (
      this.props.theSkipInfo &&
      this.props.theUser._id === this.props.jumpOwner
    ) {
      return (
        <CreateHop
          showJumpAgain={this.props.showJumpAgain}
          hopOwner={this.props.theSkipInfo._id}
        />
      );
    }
  }

  deleteSkip(id) {
    axios
      .post(
        `${process.env.REACT_APP_BASE}/skip/deleteSkip/` +
          this.props.jumpId +
          "/" +
          id
      )
      .then(() => {
        // console.log('test======', this.props.jumpId);
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
            this.deleteSkip(this.props.theSkipInfo._id);
          }}
        >
          Delete Skip
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
              pathname: `/editSkip/${this.props.theSkipInfo.jumpOwner}`,
              state: {
                skipId: this.props.theSkipInfo._id,
                city: this.props.theSkipInfo.city,
                arrivedBy: this.props.theSkipInfo.arrivedBy,
                duration: this.props.theSkipInfo.duration,
                description: this.props.theSkipInfo.description
              }
            }}
          >
            Edit This Skip
          </Link>
        </button>
      );
    }
  };

  checkId() {
    if(this.props.current % 2 === 0){
      // console.log('true')
      return true
    } else {
      // console.log('false')
      return false
    }
  }

  render() {
    // console.log('this is the skip info----',this.props) //<<<<this returns info!!!!!!
    // console.log('the key-----',this.props.current);
    if(this.checkId()){
    return (
      <div className="allUserSkip">
        <div className="skipDisplayRight">
        <div className="markerRight"></div>
          <h4>{this.props.theSkipInfo.city}</h4>
          <p>Arrived by: {this.props.theSkipInfo.arrivedBy}</p>
          <p>Days Spent: {this.props.theSkipInfo.duration}</p>
          <p>How it went: {this.props.theSkipInfo.description}</p>

          <div className="editDeleteButtons">
            <Link
              to={{
                pathname: `/editSkip/${this.props.theSkipInfo.jumpOwner}`,
                state: {
                  skipId: this.props.theSkipInfo._id,
                  city: this.props.theSkipInfo.city,
                  arrivedBy: this.props.theSkipInfo.arrivedBy,
                  duration: this.props.theSkipInfo.duration,
                  description: this.props.theSkipInfo.description
                }
              }}
              className="editSkipBtn"
            >
              <i className="material-icons editLocation">edit_location</i>
            </Link>
            <i
              className="material-icons deleteSkip"
              onClick={() => {
                this.deleteSkip(this.props.theSkipInfo._id);
              }}
            >
              delete
            </i>
          </div>

          {this.renderHops()}
          {this.renderHopAdd()}
        </div>
      </div>
    );
    } else{
      return (
        <div className="allUserSkip">
          <div className="eachskip">
          <div className="marker"></div>
            {/* <h2>Skip</h2> */}
            <h4>{this.props.theSkipInfo.city}</h4>
            <p>Arrived by: {this.props.theSkipInfo.arrivedBy}</p>
            <p>Days Spent: {this.props.theSkipInfo.duration}</p>
            <p>How it went: {this.props.theSkipInfo.description}</p>
  
            <div className="editDeleteButtons">
              <Link
                to={{
                  pathname: `/editSkip/${this.props.theSkipInfo.jumpOwner}`,
                  state: {
                    skipId: this.props.theSkipInfo._id,
                    city: this.props.theSkipInfo.city,
                    arrivedBy: this.props.theSkipInfo.arrivedBy,
                    duration: this.props.theSkipInfo.duration,
                    description: this.props.theSkipInfo.description
                  }
                }}
                className="editSkipBtn"
              >
                <i className="material-icons editLocation">edit_location</i>
              </Link>
              <i
                className="material-icons deleteSkip"
                onClick={() => {
                  this.deleteSkip(this.props.theSkipInfo._id);
                }}
              >
                delete
              </i>
            </div>
  
            {this.renderHops()}
            {this.renderHopAdd()}
          </div>
        </div>
      );
    }
  }
}

export default DisplaySkip;
