import React, {useState} from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Link, Grid } from "@material-ui/core";

import "./Home.scss";

import { Paper } from "@material-ui/core";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Home() {
  const classes = useStyles();

  const data = [
    { year: 'test1', population: 96.5 },
    { year: 'test2', population: 92.4 },
    { year: 'test3', population: 86.7 },
    { year: 'test4', population: 82.1 },
    { year: 'test5', population: 81.9 },
    { year: 'test6', population: 70.0 },
    { year: 'test7', population: 44.3 },
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

  const [data2, setData2] = useState(data);
  const [tags2, setTags2] = useState(tags);

  return (
    <div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <p>User: {localStorage.getItem('user')}, Twój wynik: 85.7</p>
            <Button variant="contained" size="large" color="secondary" className={classes.margin} href="/photo">
              Zrób zdjęcie
            </Button>
          </Grid>
          <Grid item xs={10}>
          <Paper>
            <Chart data={data2}>
              <ArgumentAxis />
              <ValueAxis />
              <BarSeries valueField="population" argumentField="year" />
              <Title text="Aktualne wyniki" />
              <EventTracker />
              <Tooltip />
            </Chart>
          </Paper>
          </Grid>
          <Grid item xs={10}>
          <Paper>
            <Chart data={tags2} rotated>
              <ArgumentAxis />
              <ValueAxis />
              <BarSeries valueField="score" argumentField="name" />
              <Title text="Najpopularniejsze tagi" />
              <EventTracker />
              <Tooltip />
            </Chart>
          </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return state.homeReducer;
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
