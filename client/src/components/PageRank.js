import React, { PureComponent } from 'react';
import { WorldMap, Grommet } from 'grommet';
import FlightDataService from '../services/flight.service.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class FlightList extends PureComponent {
  constructor(props) {
    super(props);
    this.retrieveRank = this.retrieveRank.bind(this);

    this.state = {
      rank: [],
    };
  }

  componentDidMount() {
    this.retrieveRank();
  }

  retrieveRank() {
    FlightDataService.getRank()
      .then(response => {
        this.setState({
          rank: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const {rank} = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
        <h5>Weight in Page Rank</h5>
          <BarChart
            width={1200}
            height={300}
            data={rank}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" width="10"/>
          <YAxis dataKey="weight"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="weight" fill="#8884d8" />
          </BarChart>
        </div>
        <Grommet full>
            <WorldMap
                color="neutral-1"
                places={[
                    {
                        name: 'Beijing',
                        location: [39.9042, 116.4074],
                        color: 'accent-2'
                    }
                ]}
            />
        </Grommet>
      </div>
    );
  }
}