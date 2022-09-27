import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Link, Grid } from "@material-ui/core";
import { getScores, getTags } from "../actions";

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

function Home({
  getScores,
  scoresResponse,
  scoresError,
  scores,
  getTags,
  tagsResponse,
  tagsError,
  tags,
}) {
  const classes = useStyles();

  var [dataScores, setDataScores] = useState(scores);
  var [dataTags, setDataTags] = useState(tags);

  useEffect(() => {
    const interval = setInterval(() => getScores(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => getTags(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => setDataScores(scores), [scores]);
  useEffect(() => setDataTags(tags), [tags]);

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
            <Chart data={dataScores}>
              <ArgumentAxis />
              <ValueAxis />
              <BarSeries valueField="score" argumentField="name" />
              <Title text="Aktualne wyniki" />
              <EventTracker />
              <Tooltip />
            </Chart>
          </Paper>
          </Grid>
          <Grid item xs={10}>
          <Paper>
            <Chart data={dataTags} rotated>
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
  return {
    getScores: () => {
      dispatch(getScores());
    },
    getTags: () => {
      dispatch(getTags());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
