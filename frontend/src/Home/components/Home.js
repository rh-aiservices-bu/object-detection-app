import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Link } from "@material-ui/core";

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

  return (
    <div>
      <div>
        <p>User: {localStorage.getItem('user')}</p>
      </div>
      <div>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          className={classes.margin}
          href="/photo"
        >
          {" "}
          Zrób zdjęcie
        </Button>
      </div>
      <div>
        <Paper>
          <Chart data={data}>
            <ArgumentAxis />
            <ValueAxis />

            <BarSeries
              valueField="population"
              argumentField="year"
            />
            <Title
              text="Aktualne wyniki"
            />
            <EventTracker />
            <Tooltip />
          </Chart>
        </Paper>
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
