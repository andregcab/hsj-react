import React, { Component } from "react";
import "./editjump.css";
import axios from "axios";

class EditJump extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: "",
      end: "",
      duration: "",
      description: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_BASE}/jump/details/` +
          this.props.match.params.id
      )
      .then(thisSingleJump => {
        // console.log(thisSingleJump.data);
        this.setState({
          start: thisSingleJump.data.start,
          end: thisSingleJump.data.end,
          duration: thisSingleJump.data.duration,
          description: thisSingleJump.data.description
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    // console.log(this.props)
    // `http://localhost:5000/api/jump/updateJump/${this.props.match.params.id}`
    axios
      .post(
        `${process.env.REACT_APP_BASE}/jump/updateJump/${
          this.props.match.params.id
        }`,
        {
          startCity: this.state.start,
          endCity: this.state.end,
          jumpDuration: this.state.duration,
          jumpDescription: this.state.description
        }
      )
      .then(() => {
        this.props.history.push("/viewJump/" + this.props.match.params.id);
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="editJump">
        <div className="jumpFormContent">
          <h3>Edit Jump</h3>
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field col s12">
              <input
                type="text"
                className="validate"
                name="start"
                value={this.state.start}
                onChange={this.handleChange}
              />
              <label className="active">Start</label>
            </div>

            <div className="input-field col s12">
              <label className="active" htmlFor="end">
                End
              </label>
              <input
                id="end"
                type="text"
                className="validate"
                name="end"
                value={this.state.end}
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field col s12">
              <label className="active">End</label>
              <input
                type="number"
                className="validate"
                name="duration"
                value={this.state.duration}
                onChange={this.handleChange}
              />
            </div>

            <div className="input-field col s12">
              <textarea
                id="textarea3"
                className="materialize-textarea descriptionTextArea"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
              <label htmlFor="textarea3">Describe Your Adventure</label>
            </div>

            <button className="btn saveEditJump" type="submit">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default EditJump;
