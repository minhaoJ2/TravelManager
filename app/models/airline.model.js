const sql = require("./db.js");

const Airline = function(airline) {
    this.airlineCode = airline.airlineCode;
    this.airlineName = airline.airlineName;
    this.establishYear = airline.establishYear;
};

Airline.createAirline = (newAirline, result) => {
    //Create a Flight
    sql.query("insert into airline set airlineCode = ?, airlineName = ?, establishYear = ?", 
    [newAirline.airlineCode, newAirline.airlineName, newAirline.establishYear], 
    (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created airline: ", {id: res.insertId, ...newAirline});
        result(null, {id: res.insertId, ...newAirline});
    });
};


Airline.findOneAirline = (tempAirlineCode, result) => {
    sql.query(`SELECT * FROM airline WHERE airlineCode = ${tempAirlineCode}`, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("airlines: ", res);
      result(null, res);
    
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

//   //join 
//   Flight.findwithJoin = (tempDepCity, tempManufact, result) => {
//     sql.query(`SELECT * FROM flight NATURAL JOIN model WHERE depCity = ${tempDepCity} AND manufacturer = ${tempManufact}`, (err, res) => {
//     if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
  
//       console.log("customers: ", res);
//       result(null, res);
    
  
//       // not found Customer with the id
//       result({ kind: "not_found" }, null);
//     });
//   };


  Airline.findAllAirlines = result => {
    sql.query("SELECT * FROM airline", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("airlines: ", res);
      result(null, res);
    });
  };


  Airline.remove = (tempAirlineCode, result) => {
    sql.query(`DELETE FROM airline WHERE airlineCode = ${tempAirlineCode}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
    //   if (res.affectedRows == 0) {
    //     // not found Customer with the id
    //     result({ kind: "not_found" }, null);
    //     return;
    //   }
  
      console.log("deleted airline with airlineCode: ", tempAirlineCode);
      result(null, res);
    });
  };

//   Flight.findwithGP = result => {
//     sql.query(`SELECT depCity, arrCity, COUNT(flightNo) AS numOfFlights FROM flight GROUP BY depCity, arrCity ORDER BY numOfFlights DESC`, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }
      
//         console.log("customers: ", res);
//         result(null, res);
//     });
//   };

  Airline.updateByAirlineCode = (airlineCode, airline, result) => {
    sql.query(
      `UPDATE airline SET airlineCode = ?, airlineName = ?, establishYear = ? WHERE airlineCode = ${airlineCode}`,
      [airline.airlineCode, airline.airlineName, airline.establishYear, airlineCode],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated airline: ", { airlineCode: airlineCode, ...airline });
        result(null, { airlineCode: airlineCode, ...airline });
      }
    );
  };

  module.exports = Airline;