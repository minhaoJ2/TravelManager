import React,{ Component } from "react";
import FlightDataService from "../../services/flight.service";

export default class AirlineCreateForm extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.saveAirline = this.saveAirline.bind(this);
        this.newAirline = this.newAirline.bind(this);

        this.state = {
            airlineCode: "",
            airlineName: "",
            establishYear: "",
            uploaded: false
        };
    }
    onChangeCode(e) {
      this.setState({
        airlineCode: e.target.value
      });
    }
    onChangeName(e) {
        this.setState({
            airlineName: e.target.value
        });
    }
    onChangeYear(e) {
        this.setState({
            establishYear: e.target.value
        });
    }
    saveAirline() {
        var data = {
            airlineCode: this.state.airlineCode,
            airlineName: this.state.airlineName,
            establishYear: this.state.establishYear,
            uploaded: true
        };

        FlightDataService.createAirline(data)
            .then(response => {
                this.setState({
                    airlineCode: response.data.airlineCode,
                    airlineName: response.data.airlineName,
                    establishYear: response.data.establishYear,
                    uploaded: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    newAirline() {
        this.setState({
            airlineCode: "",
            airlineName: "",
            establishYear: "",
            uploaded: false
        });
    }
    render() {
    return (
      <div className="submit-form">
        {this.state.uploaded ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newAirline}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="Code">Airline Code</label>
              <input
                type="text"
                className="form-control"
                id="Code"
                required
                placeholder="Enter the Airline Code"
                value={this.state.airlineCode}
                onChange={this.onChangeCode}
                name="Code"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Name">Airline Name</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                required
                placeholder="Enter the name of the airline"
                value={this.state.airlineName}
                onChange={this.onChangeName}
                name="Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="establishYear">Establish Year</label>
              <input
                type="text"
                className="form-control"
                id="establishYear"
                required
                placeholder="Enter the establishment year of this airline"
                value={this.state.establishYear}
                onChange={this.onChangeYear}
                name="establishYear"
              />
            </div>

            <button onClick={this.saveAirline} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}