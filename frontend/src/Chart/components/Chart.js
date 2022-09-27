import * as React from 'react';
import Paper from "@material-ui/core";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';

const data = [
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.440 },
  { year: '1990', population: 5.310 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.930 },
];

var tags = [
  { name: 'hat', score: 6.5 },
  { name: 'cup', score: 4.5 },
  { name: 'dog', score: 7.5 },
  { name: 'cat', score: 9.5 },
  { name: 'tiger', score: 3.5 },
  { name: 'elephant', score: 3.5 },
  { name: 'spoon', score: 2.5 },
  { name: 'plant', score: 6.5 },
];

export default class Chart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      tags
    };
  }

  render() {
    const { data: chartData } = this.state.data;
    const { data: tagsData } = this.state.tags;

    return (
      <Paper>
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries valueField="population" argumentField="year" />
          <Title text="Current score" />
          <EventTracker />
          <Tooltip />
        </Chart>
        <Chart data={chartData} rotated>
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries valueField="score" argumentField="name" />
          <Title text="The most popular tags" />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Paper>
    );
  }
}