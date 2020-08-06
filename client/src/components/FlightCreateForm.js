import React,{ Component } from "react";
import FlightDataService from "../services/flight.service";

export default class FlightCreateForm extends Component {
    constructor(props) {
        super(props);
        this.onChangeDeparture = this.onChangeDeparture.bind(this);
        this.onChangeArrival = this.onChangeArrival.bind(this);
        this.onChangeAirline = this.onChangeAirline.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeFlightNum = this.onChangeFlightNum.bind(this);
        this.saveFlight = this.saveFlight.bind(this);
        this.newFlight = this.newFlight.bind(this);

        this.state = {
            Departure: "",
            Arrival: "",
            Airline: "",
            ModelName: "",
            FlightNum: "",
            uploaded: false
        };
    }

    onChangeDeparture(e) {
        this.setState({
            Departure: e.target.value
        });
    }
    onChangeArrival(e) {
        this.setState({
            Arrival: e.target.value
        });
    }
    onChangeAirline(e) {
        this.setState({
            Airline: e.target.value
        });
    }
    onChangeModel(e) {
        this.setState({
            ModelName: e.target.value
        });
    }
    onChangeFlightNum(e) {
      this.setState({
        FlightNum: e.target.value
      });
    }
    saveFlight() {
        var data = {
            Departure: this.state.Departure,
            Arrival: this.state.Arrival,
            Airline: this.state.Airline,
            ModelName: this.state.ModelName,
            FlightNum: this.state.FlightNum,
            uploaded: true
        };

        FlightDataService.create(data)
            .then(response => {
                this.setState({
                    Departure: response.data.Departure,
                    Arrival: response.data.Arrival,
                    Airline: response.data.Airline,
                    ModelName: response.data.ModelName,
                    FlightNum: response.data.FlightNum,
                    uploaded: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    newFlight() {
        this.setState({
            id: null,
            Departure: "",
            Arrival: "",
            Airline: "",
            ModelName: "",
            uploaded: false
        });
    }

    render() {
    return (
      <div className="submit-form">
        {this.state.uploaded ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newFlight}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="Departure">Departure</label>
              <input
                type="text"
                className="form-control"
                id="Departure"
                required
                placeholder="Enter the Departure city"
                value={this.state.Departure}
                onChange={this.onChangeDeparture}
                name="Departure"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Arrival">Arrival</label>
              <input
                type="text"
                className="form-control"
                id="Arrival"
                required
                placeholder="Enter the Arrival city"
                value={this.state.Arrival}
                onChange={this.onChangeArrival}
                name="Arrival"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Arrival">Airline</label>
              <input
                type="text"
                className="form-control"
                id="Airline"
                required
                placeholder="Enter the airline this flight belongs to"
                value={this.state.Airline}
                onChange={this.onChangeAirline}
                name="Airline"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ModelName">Model Name</label>
              <input
                type="text"
                className="form-control"
                id="ModelName"
                required
                placeholder="Enter the model name of this flight"
                value={this.state.ModelName}
                onChange={this.onChangeModel}
                name="ModelName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ModelName">Flight Number</label>
              <input
                type="text"
                className="form-control"
                id="FlightNum"
                required
                placeholder="Enter the flight number of this flight"
                value={this.state.FlightNum}
                onChange={this.onChangeFlightNum}
                name="FlightNum"
              />
            </div>

            <button onClick={this.saveFlight} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}