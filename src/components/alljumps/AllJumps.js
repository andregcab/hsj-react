import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./alljumps.css";

class AllJumps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      jumps: [], 
      filteredJumps: []
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BASE}/jump/allJumps`)
      .then(res => {  
        this.setState({
          jumps: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(jump => {
        return jump.name.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData
      };
    });
  };

  render() {
    return (
      <div>
        <div className="search-bar">
        <form>
          <input
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
      </div>
      <div className="allCards">
        {this.state.jumps.map(jump => {
          return (
            <div className="card allUserJumpsCard large">
              <img src={jump.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">
                  {jump.start}{" "}
                  <i id="plane" className="material-icons prefix">
                    airplanemode_active
                  </i>{" "}
                  {jump.end}
                </h5>
                <p>{jump.duration} Days</p>
                <p className="card-text">{jump.description}</p>
              </div>
              <div className="card-action">
                <Link
                  key={jump._id}
                  to={`/viewJump/${jump._id}`}
                  className="homelink"
                >
                  View this Jump
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    );
  }
}
export default AllJumps;
