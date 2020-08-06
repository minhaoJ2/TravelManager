const sql = require("./db.js");

const Flight = function(flight) {
    this.FlightNum = flight.FlightNum;
    this.Departure = flight.Departure;
    this.Arrival = flight.Arrival;
    this.Airline = flight.Airline;
    this.ModelName = flight.ModelName;
};

Flight.create = (newFlight, result) => {
    //Create a Flight
    sql.query("insert into flight set Departure = ?, Arrival = ?, Airline = ?, FlightNum = ?, ModelName = ?", 
    [newFlight.Departure, newFlight.Arrival,newFlight.Airline, newFlight.FlightNum, newFlight.ModelName], 
    (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created flight: ", {id: res.insertId, ...newFlight});
        result(null, {id: res.insertId, ...newFlight});
    });
};

Flight.getAll = result => {
    sql.query("SELECT * FROM flight", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
};

  Flight.findByDeparture = (Departure, result) => {
    sql.query(`SELECT * FROM flight WHERE Departure = ${Departure}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length >= 0) {
        console.log("found flight: ", res.length);
        result(null, res);
        return;
      }
  
      // not found Flight with the Departure
      result({ kind: "not_found" }, null);
    });
  };

  Flight.findByArrival = (Arrival, result) => {
    sql.query(`SELECT * FROM flight WHERE Arrival = ${Arrival}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length >= 0) {
        console.log("found flight: ", res.length);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

  Flight.findByAirline = (Airline, result) => {
    sql.query(`SELECT * FROM flight WHERE Airline = ${Airline}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length >= 0) {
        console.log("found flight: ", res.length);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

  Flight.findByModel = (ModelName, result) => {
    sql.query(`SELECT * FROM flight WHERE ModelName = ${ModelName}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length >= 0) {
        console.log("found flight: ", res.length);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

  Flight.findByFlightNum = (FlightNum, result) => {
    sql.query(`SELECT * FROM flight WHERE FlightNum = ${FlightNum}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length >= 0) {
        console.log("found flight: ", res.length);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

  Flight.delete = (FlightNum, result) => {
    sql.query(`DELETE FROM flight WHERE FlightNum = ${FlightNum}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("deleted flight with id: ", FlightNum);
      result(null, res);
    });
  };

  Flight.update = (FlightNum, flight, result) => {
    sql.query(
      `UPDATE flight SET Departure = ?, Arrival = ?, ModelName = ?, Airline = ? WHERE FlightNum = ${FlightNum}`,
      [flight.Departure, flight.Arrival, flight.ModelName, flight.Airline, FlightNum],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found flight with the flightNo
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated flight: ", { FlightNum: FlightNum, ...flight });
        result(null, { FlightNum: FlightNum, ...flight });
      }
    );
  };

  module.exports = Flight;