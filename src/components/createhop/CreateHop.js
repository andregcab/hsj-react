import React, { Component } from "react";
import { Modal, Button } from "react-materialize";
import axios from "axios";
import "./createhop.css";

class CreateHop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPoi: "",
      newArrive: "",
      newDecription: ""
    };
  }
  handleFormSubmit = event => {
    event.preventDefault();
    // console.log('this is the id that will be used to create the hop!!!',this.props.hopOwner);
    axios
      .post(
        `${process.env.REACT_APP_BASE}/hop/newHop`,
        {
          poi: this.state.newHopAttraction,
          arrivedBy: this.state.newHopMot,
          description: this.state.newHopDescription,
          hopOwner: this.props.hopOwner
        },
        { withCredentials: true }
      )
      .then(() => {
        this.setState({
          newHopAttraction: "",
          newHopMot: "",
          newHopDescription: ""
        });
        this.props.showJumpAgain();
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log(this.state)
  };

  render() {
    return (
      <div>
        <div>
          <Button
            href={`#${this.props.hopOwner}`}
            className="modal-trigger createNewHopBtn"
          >
            Create new Hop
          </Button>
          <Modal id={this.props.hopOwner} className="createHopModal">
            <div className="createHopContent">
              <h3> Create Hop</h3>
              <form onSubmit={this.handleFormSubmit}>
                <div className="createHop-input-field input-field col s12">
                  <input
                    id="poi"
                    type="text"
                    className="validate"
                    name="newHopAttraction"
                    value={this.state.newHopAttraction}
                    onChange={e => this.handleChange(e)}
                    required
                  />
                  <label htmlFor="poi">Point OF Interest</label>
                </div>

                <div className="createHop-input-field input-field col s12">
                  <input
                    id="mot"
                    type="text"
                    className="validate"
                    name="newHopMot"
                    value={this.state.newHopMot}
                    onChange={e => this.handleChange(e)}
                    required
                  />
                  <label htmlFor="mot">Method OF Transportation</label>
                </div>

                <div className="createHop-input-field input-field col s12">
                  <textarea
                    id="textarea2"
                    className="materialize-textarea"
                    name="newHopDescription"
                    value={this.state.newHopDescription}
                    onChange={e => this.handleChange(e)}
                    required
                  />
                  <label htmlFor="textarea2">Describe Your Adventure</label>
                </div>
                <button className="btn modal-close addHop">Add Hop</button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default CreateHop;
