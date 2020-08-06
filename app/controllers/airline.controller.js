const Airline = require("../models/airline.model.js");
//const Customer = require("../models/customer.model.js");
//const sql = require("./db.js");

exports.createAirline = (req, res) => {
  //validate request
  if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
  }

  //create a flight
  const airline = new Airline({
      airlineCode: req.body.airlineCode,
      airlineName: req.body.airlineName,
      establishYear: req.body.establishYear
  });

  //save flight in db
  Airline.createAirline(airline, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Airline."
        });
      else res.send(data);
    });
};


exports.findAllAirlines = (req, res) => {
    Airline.findAllAirlines((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving airlines."
        });
      else res.send(data);
    });
  };
  

  exports.findOneAirline = (req, res) => {
    Airline.findOneAirline(req.params.tempAirlineCode, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Airline with id ${req.params.tempAirlineCode}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving airline with id " + req.params.tempAirlineCode
          });
        }
      } else res.send(data);
    });
  };


  exports.delete = (req, res) => {
    Airline.remove(req.params.tempAirlineCode, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found airline with airlineCode ${req.params.tempAirlineCode}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete airline with airlineCode " + req.params.tempAirlineCode
          });
        }
      } else res.send({ message: `airline was deleted successfully!` });
    });
  };


  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Airline.updateByAirlineCode(
      req.params.airlineCode,
      new Airline(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found airline with airlineCode ${req.params.airlineCode}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating airline with airlineCode " + req.params.airlineCode
            });
          }
        } else res.send(data);
      }
    );
  };