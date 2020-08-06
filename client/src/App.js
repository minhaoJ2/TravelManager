import React from 'react';
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AddFlight from "./components/FlightCreateForm";
import Flight from "./components/flight";
import FlightList from "./components/flight-list";
import AirlineCreateForm from "./components/Airline/AirlineCreateForm"
import ModelCreateForm from "./components/ModelName/ModelCreateForm"
import PageRank from "./components/PageRank"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="./" className="navbar-brand">Traval Manager</a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/rank"} className="nav-link">City Rank</Link>
            </li>
            <li className="nav-item">
              <Link to={"/addFlight"} className="nav-link">Add Flight</Link>
            </li>
            <li className="nav-item">
              <Link to={"/Airline"} className="nav-link">Airline</Link>
            </li>
            <li className="nav-item">
              <Link to={"/ModelName"} className="nav-link">Model Name</Link>
            </li>
          </div>
        </nav>
        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/flights"]} component={FlightList} />
            <Route exact path="/addFlight" component={AddFlight}/>
            <Route path="/flights/:FlightNum" component={Flight}/>
            <Route path="/Airline" component={AirlineCreateForm}/>
            <Route path="/ModelName" component={ModelCreateForm}/>
            <Route path="/rank" component={PageRank}/>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
