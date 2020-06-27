import React, { Component } from "react";
import MappyMap from '../googlemap/MapRender.js'
import {Link} from 'react-router-dom';
import DisplaySkip from "../displayskip/DisplaySkip.js";
import axios from "axios";
import "./viewjump.css";
import EditSkip from "../editskip/EditSkip.js";
import CreateSkip from "../createskip/CreateSkip.js";

class ViewJump extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theJump: null,
      skipCityArray: []
    };
  }
  
  componentDidMount() {
    this.getSingleJumpInfo();
  }

  getSingleJumpInfo = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE}/jump/details/` + this.props.match.params.id
      )
      .then(theSingleJump => {
        this.setState({ theJump: theSingleJump.data });
        this.skipsForGoogleMaps()
      })
      .catch(err => {
        console.log(err);
      });
  }


  createTitle() {
    let skipLength = Object.keys(this.state.theJump.skip).length;
    if (skipLength > 1) {
      return (
        <h1 className="jumpTitle">
          {this.state.theJump.skip[0].city}<i  id="plane" className="material-icons prefix titlePlane">airplanemode_active</i>{" "}
          {this.state.theJump.skip[this.state.theJump.skip.length - 1].city}
        </h1>
      );
    } else {
      return (
        <p className="ifNoSkips">
          Let's add at least two skips! Your first and last skip will be where
          your trip really starts and ends.{" "}
        </p>
      );
    }
  }

   

  renderSkips() {
    if (this.state.theJump.skip) {
      return this.state.theJump.skip.map((skip, i) => {
          return (
            <DisplaySkip 
              {...this.props}
              key={skip._id}
              current={i}
              theSkipInfo={skip}
              theUser={this.props.theUser}
              jumpOwner={this.state.theJump.ownerId}
              jumpId={this.state.theJump._id}
              showJumpAgain={this.getSingleJumpInfo}
            />
          );
      });
    } else {
      return null;
    }
  }

  skipsForGoogleMaps() {
    if (this.state.theJump.skip) {
      return this.state.theJump.skip.map(skip => {
        this.state.skipCityArray.push({location: skip.city})
        this.setState();
        return (
          {location: skip.city}
        );
      });
    } else {
      return null;
    }
  }

  renderSkipEdit() {
    if (
      this.state.theJump.skip[0] &&
      this.props.theUser._id === this.state.theJump.ownerId
    ) {
      return <EditSkip jumpOwner={this.state.theJump._id} />;
    } else {
      return null;
    }
  }

  renderSkipAdd = () => {
    if (
      this.state.theJump &&
      this.props.theUser._id === this.state.theJump.ownerId
    ) {
      return <CreateSkip 
      jumpOwner={this.state.theJump._id}
      showJumpAgain={this.getSingleJumpInfo}/>;
    }
  }

  deleteJump(e) {
    // if(!window.confirm('Are you sure you want to delete the whole Jump?'))e.preventDefault()
    axios
      .post(
        `${process.env.REACT_APP_BASE}/jump/deleteJump/` + this.state.theJump._id
      )
      .then(theJumpToDelete => {
        // console.log("sucessfully deleted", theJumpToDelete);
        this.props.history.push('/userHomepage')
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderDelete(){
    if(this.props.theUser._id === this.state.theJump.ownerId){
      return  <button
      onClick= {(e) => {
        this.deleteJump();
      }}
    >
      Delete whole jump!
    </button>
    }
  }

  renderEdit(){
    if(this.props.theUser._id === this.state.theJump.ownerId){
      return <button> <Link to={`/editJump/${this.state.theJump._id}`}>Edit This Jump</Link></button>
    }
  }


  render() {
    if (this.state.theJump) {
      return (
        <div className="mapContainer">
          <MappyMap id="top" renderSkips={this.state.skipCityArray}/>
          {this.createTitle()}
          <div>
            <div className="boxStuff">
            <div className="oneJumpImage">
              <img src={this.state.theJump.image} alt="..."/>
            </div>
         
            <div className="jumpInOut">
                <h2>{this.state.theJump.start}
                <i  id="plane" className="material-icons prefix oneJumpPlane">airplanemode_active</i>
                 {this.state.theJump.end}</h2>
                <p>Total travel time: {this.state.theJump.duration} Days.</p>
                <h5>{this.state.theJump.description}</h5>
                <div className="jumpDeleteEdit">
                  <Link to={`/editJump/${this.state.theJump._id}`} className="editJumpBtn"><i className="material-icons editJumpLocation">
                edit_location
                </i></Link>
                <i className="material-icons deleteJump"  onClick= {(e) => {
                    this.deleteJump();
                  }}>delete</i>
                </div>

            </div>
            </div>
            <hr/>
            <div className="buttonHolder">
            {this.renderSkipAdd()}
            </div>
            <hr/>
              
              <h2 className="skipTitle">SKIP</h2>

         
          </div>
          {this.renderSkips()}
          <div>
            <button className="goUp  btn">
            <a href="#top"><i className="material-icons"> arrow_upward</i></a>
            </button>
            
          </div>
        
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ViewJump;
