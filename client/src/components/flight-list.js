import React, { Component } from "react";
import FlightDataService from "../services/flight.service";
import { Link } from "react-router-dom";

export default class FlightList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchDeparture = this.onChangeSearchDeparture.bind(this);
    this.onChangeSearchArrival = this.onChangeSearchArrival.bind(this);
    this.onChangeSearchAirline = this.onChangeSearchAirline.bind(this);
    this.onChangeSearchModel = this.onChangeSearchModel.bind(this);
    this.retrieveFlights = this.retrieveFlights.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveFlights = this.setActiveFlights.bind(this);
    this.removeAllFlights = this.removeAllFlights.bind(this);
    this.searchDeparture = this.searchDeparture.bind(this);
    this.searchArrival = this.searchArrival.bind(this);
    this.searchAirline = this.searchAirline.bind(this);
    this.searchModel = this.searchModel.bind(this);

    this.state = {
      flights: [],
      currentFlight: null,
      currentIndex: -1,
      searchDeparture: "",
      searchArrival: "",
      searchAirline: "",
      searchModel: ""
    };
  }

  componentDidMount() {
    this.retrieveFlights();
  }

  onChangeSearchDeparture(e) {
    const searchDeparture = e.target.value;

    this.setState({
      searchDeparture: searchDeparture
    });
  }
  onChangeSearchArrival(e) {
    const searchArrival = e.target.value;
    this.setState({
      searchArrival: searchArrival
    });
  }
  onChangeSearchAirline(e) {
    const searchAirline = e.target.value;
    this.setState({
      searchAirline: searchAirline
    });
  }
  onChangeSearchModel(e) {
    const searchModel = e.target.value;
    this.setState({
      searchModel: searchModel
    })
  }
  retrieveFlights() {
    FlightDataService.getAll()
      .then(response => {
        this.setState({
          flights: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFlights();
    this.setState({
      currentFlight: null,
      currentIndex: -1
    });
  }

  setActiveFlights(flight, index) {
    this.setState({
      currentFlight: flight,
      currentIndex: index
    });
  }

  removeAllFlights() {
    FlightDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchDeparture() {
    FlightDataService.findByDeparture(this.state.searchDeparture)
      .then(response => {
        this.setState({
          flights: response.data
        });
        console.log("Search Departure",response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchArrival() {
    FlightDataService.findByArrival(this.state.searchArrival)
      .then(response => {
        this.setState({
          flights: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }
  searchAirline() {
    FlightDataService.findByAirline(this.state.searchAirline)
      .then(response => {
        this.setState({
          flights: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  searchModel() {
    FlightDataService.findByModel(this.state.searchModel)
      .then(response => {
        this.setState({
          flights: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  render() {
    const { searchDeparture, searchArrival, searchAirline, searchModel, flights, currentFlight, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Departure"
              value={searchDeparture}
              onChange={this.onChangeSearchDeparture}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchDeparture}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Arrival"
              value={searchArrival}
              onChange={this.onChangeSearchArrival}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchArrival}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Airline"
              value={searchAirline}
              onChange={this.onChangeSearchAirline}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchAirline}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Model Name"
              value={searchModel}
              onChange={this.onChangeSearchModel}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchModel}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Flight List</h4>

          <ul className="list-group">
            {flights &&
              flights.map((flight, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFlights(flight, index)}
                  key={index}
                >
                  Departure: {flight.Departure} Arrival: {flight.Arrival} Flight Number: {flight.FlightNum}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentFlight ? (
            <div>
              <h4>Flights</h4>
              <div>
                <label>
                  <strong>Departure:</strong>
                </label>{" "}
                {currentFlight.Departure}
              </div>
              <div>
                <label>
                  <strong>Arrival:</strong>
                </label>{" "}
                {currentFlight.Arrival}
              </div>
              <div>
                <label>
                  <strong>Airline:</strong>
                </label>{" "}
                {currentFlight.Airline}
              </div>
              <div>
                <label>
                  <strong>Model Name:</strong>
                </label>{" "}
                {currentFlight.ModelName}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentFlight.uploaded ? "Published" : "Pending"}
              </div>

              <Link
                to={"/flights/" + currentFlight.FlightNum}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a flight</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}