const Flight = require("../models/Flight.model.js");

exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    //create a flight
    const flight = new Flight({
        FlightNum: req.body.FlightNum,
        Departure: req.body.Departure,
        Arrival: req.body.Arrival,
        Airline: req.body.Airline,
        ModelName: req.body.ModelName
    });

    //save flight in db
    Flight.create(flight, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Flight."
          });
        else res.send(data);
      });
};

exports.findAll = (req, res) => {
  Flight.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving flights."
      });
    else res.send(data);
  });
};

exports.findByDeparture = (req, res) => {
  Flight.findByDeparture(req.params.Departure, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flight with Departure ${req.params.Departure}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Flight with Departure " + req.params.Departure
        });
      }
    } else res.send(data);
  });
};

exports.findByArrival = (req, res) => {
  Flight.findByArrival(req.params.Arrival, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flight with Arrival ${req.params.Arrival}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Flight with Arrival " + req.params.Arrival
        });
      }
    } else res.send(data);
  });
};

exports.findByAirline = (req, res) => {
  Flight.findByAirline(req.params.Airline, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flight with Airline ${req.params.Airline}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Flight with Airline " + req.params.Airline
        });
      }
    } else res.send(data);
  });
};

exports.findByModel = (req, res) => {
  Flight.findByModel(req.params.ModelName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flight with model ${req.params.ModelName}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Flight with model " + req.params.ModelName
        });
      }
    } else res.send(data);
  });
};

exports.findByFlightNum = (req, res) => {
  Flight.findByFlightNum(req.params.FlightNum, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flight with model ${req.params.FlightNum}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Flight with model " + req.params.FlightNum
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Flight.delete(req.params.FlightNum, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Flight with flightNo ${req.params.FlightNum}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Flight with id " + req.params.FlightNum
        });
      }
    } else res.send({ message: `Flight was deleted successfully!` });
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Flight.update(
    req.params.FlightNum,
    new Flight(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Flight with flightNo ${req.params.FlightNum}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Flight with flightNo " + req.params.FlightNum
          });
        }
      } else res.send(data);
    }
  );
};