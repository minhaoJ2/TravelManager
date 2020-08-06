module.exports = app => {
    const airlines = require("../controllers/airline.controller.js");
  
    //Create a new airline
    app.post("/Airline", airlines.createAirline);
  
    // Retrieve an airline according to airline code
    app.get("/Airline/airlineCode/:tempAirlineCode", airlines.findOneAirline);

    //Retrieve all the airlines
    app.get("/Airline", airlines.findAllAirlines);

    // Update an airline with airlineCode
    app.put("/Airline/airlineCode/:airlineCode", airlines.update);
  
    // Delete a airline with airlineCode
    app.delete("/Airline/airlineCode/:tempAirlineCode", airlines.delete);
  
  };