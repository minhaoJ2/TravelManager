module.exports = app => {
    const flights = require("../controllers/Flight.controller.js");
  
    // Create a new Flight
    app.post("/flights", flights.create);
  
    // Retrieve all Customers
    app.get("/flights", flights.findAll);
  
    // Retrieve a single flight with flightNo
    app.get("/flights/:Departure", flights.findByDeparture);
    app.get("/flights/Arrival/:Arrival", flights.findByArrival);
    app.get("/flights/Airline/:Airline", flights.findByAirline);
    app.get("/flights/ModelName/:ModelName", flights.findByModel);
    app.get("/flights/FlightNum/:FlightNum", flights.findByFlightNum);
    // app.put("/flights/FlightNum/:FlightNum", flights.update);
    app.put("/flights/FlightNum/:FlightNum", flights.update);
    app.delete("/flights/FlightNum/:FlightNum", flights.delete);
    // app.get("/flightsGroupby", flights.findDA);
  };