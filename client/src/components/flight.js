import React, { Component } from "react";
import FlightDataService from "../services/flight.service";

export default class Flight extends Component {
  constructor(props) {
    super(props);
    this.onChangeDeparture = this.onChangeDeparture.bind(this);
    this.onChangeArrival = this.onChangeArrival.bind(this);
    this.onChangeAirline = this.onChangeAirline.bind(this);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeFlightNum = this.onChangeFlightNum.bind(this);
    this.getFlight = this.getFlight.bind(this);
    this.updateUploaded = this.updateUploaded.bind(this);
    this.updateFlight= this.updateFlight.bind(this);
    this.deleteFlight = this.deleteFlight.bind(this);

    this.state = {
      currentFlight: {
        id: null,
        Departure: "",
        Arrival: "",
        Airline: "",
        ModelName: "",
        uploaded: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getFlight(this.props.match.params.id);
  }

  onChangeFlightNum(e) {
    const FlightNum = e.target.value;

    this.setState(prevState => ({
      currentFlight: {
        ...prevState.currentFlight,
        FlightNum: FlightNum
      }
    }));
  }

  onChangeDeparture(e) {
    const Departure = e.target.value;

    this.setState(function(prevState) {
      return {
        currentFlight: {
          ...prevState.currentFlight,
          Departure: Departure
        }
      };
    });
  }

  onChangeArrival(e) {
    const Arrival = e.target.value;
    
    this.setState(prevState => ({
      currentFlight: {
        ...prevState.currentFlight,
        Arrival: Arrival
      }
    }));
  }

  onChangeAirline(e) {
    const Airline = e.target.value;

    this.setState(prevState => ({
      currentFlight: {
        ...prevState.currentFlight,
        Airline: Airline
      }
    }));
  }

  onChangeModel(e) {
    const ModelName = e.target.value;

    this.setState(prevState => ({
      currentFlight: {
        ...prevState.currentFlight,
        ModelName: ModelName
      }
    }));
  }

  getFlight(id) {
    FlightDataService.get(id)
      .then(response => {
        this.setState({
          currentFlight: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUploaded(status) {
    var data = {
      id: this.state.currentFlight.id,
      Departure: this.state.currentFlight.Departure,
      Arrival: this.state.currentFlight.Arrival,
      Airline: this.state.currentFlight.Airline,
      ModelName: this.state.currentFlight.ModelName,
      uploaded: status
    };

    FlightDataService.update(this.state.currentFlight.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentFlight: {
            ...prevState.currentFlight,
            uploaded: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFlight() {
    FlightDataService.update(
      this.state.currentFlight.id,
      this.state.currentFlight
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The flight information was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteFlight() {    
    FlightDataService.delete(this.state.currentFlight.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/flights')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentFlight } = this.state;

    return (
      <div>
        {currentFlight ? (
          <div className="edit-form">
            <h4>Flight information</h4>
            <form>
              <div className="form-group">
                <label htmlFor="Departure">Departure</label>
                <input
                  type="text"
                  className="form-control"
                  id="Departure"
                  value={currentFlight.Departure}
                  onChange={this.onChangeDeparture}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Arrival">Arrival</label>
                <input
                  type="text"
                  className="form-control"
                  id="Arrival"
                  value={currentFlight.Arrival}
                  onChange={this.onChangeArrival}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFlight.uploaded ? "Uploaded" : "Pending"}
              </div>
            </form>

            {currentFlight.uploaded ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateUploaded(false)}
              >
                Unupload
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateUploaded(true)}
              >
                Upload
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteFlight}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateFlight}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Find your flight</p>
          </div>
        )}
      </div>
    );
  }
}