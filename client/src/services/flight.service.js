import http from "../http-common";

class FlightDataService {
  getAll() {
    return http.get("/flights");
  }
  create(data) {
    return http.post("/flights", data);
  }
  createAirline(data) {
    return http.post("/Airline", data);
  }
  createModel(data) {
    return http.post("/ModelName", data);
  }
  update(FlightNum, data) {
    return http.put(`/flights/FlightNum/"${FlightNum}"`, data);
  }

  getRank() {
    return http.get("/rank");
  }
  delete(FlightNum) {
    return http.delete(`/flights/FlightNum/"${FlightNum}"`);
  }

  deleteAll() {
    return http.delete(`/flights`);
  }

  findByFlightNum(FlightNum) {
    return http.get(`/flights/FlightNum/"${FlightNum}"`);
  }

  findByDeparture(Departure) {
    return http.get(`/flights/"${Departure}"`);
  }

  findByArrival(Arrival) {
    return http.get(`/flights/Arrival/"${Arrival}"`);
  }

  findByAirline(Airline) {
    return http.get(`/flights/Airline/"${Airline}"`);
  }

  findByModel(ModelName) {
    return http.get(`/flights/ModelName/"${ModelName}"`);
  }
}

export default new FlightDataService();