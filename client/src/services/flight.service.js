import http from "../http-common";

class FlightDataService {
  getAll() {
    return http.get("/flights");
  }

  get(id) {
    return http.get(`/flights/${id}`);
  }

  create(data) {
    return http.post("/flights", data);
  }

  update(id, data) {
    return http.put(`/flights/${id}`, data);
  }

  delete(id) {
    return http.delete(`/flights/${id}`);
  }

  deleteAll() {
    return http.delete(`/flights`);
  }

  findByFlightNum(FlightNum) {
    return http.get(`/flights?FlightNum=${FlightNum}`);
  }

  findByDeparture(Departure) {
    return http.get(`/flights?Departure=${Departure}`);
  }

  findByArrival(Arrival) {
    return http.get(`/flights?Arrival=${Arrival}`);
  }

  findByAirline(Airline) {
    return http.get(`/flights?Airline=${Airline}`);
  }

  findByModelName(ModelName) {
    return http.get(`/flights?ModelName=${ModelName}`);
  }
}

export default new FlightDataService();