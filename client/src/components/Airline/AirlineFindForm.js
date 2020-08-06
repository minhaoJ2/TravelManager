import React, { Component } from "react";
import FlightDataService from "../../services/flight.service";

export default class AirlineFindForm extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.searchAirline = this.searchAirline.bind(this);

        this.state = {
            Name: "",
            EstablishYear: ""
        };
    }

    onChangeName(e) {
        this.setState({
            Name: e.target.value
        });
    }
    onChangeYear(e) {
        this.setState({
            EstablishYear: e.target.value
        });
    }
    
}