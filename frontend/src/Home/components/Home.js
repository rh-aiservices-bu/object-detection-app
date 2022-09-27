import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Avatar, Grid } from "@material-ui/core";
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

  var [dataScores, setDataScores] = useState(scores.scores);
  var [dataTags, setDataTags] = useState(tags);
  var [score, setScore] = useState(scores.score);

  useEffect(() => {
    getScores();
    getTags();
  }, []);

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

  useEffect(() => {
    setDataScores(scores.scores);
    setScore(scores.score)
  }, [scores]);
  useEffect(() => setDataTags(tags), [tags]);

  return (
    <Grid container spacing={3}>
      <Grid container xs={6} direction="row" alignItems="center" className="marginPanel">
        <Grid item xs={1}>
          <Avatar>{localStorage.getItem('nick').slice(0,2).toLocaleUpperCase()}</Avatar>
        </Grid>
        <Grid item xs={5}>
          <p className="rh-event-teaser-meta">Witaj <b>{localStorage.getItem('nick')}</b>! Twój wynik: <b>{score}</b></p>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" size="large" color="secondary" className={classes.margin} href="/photo">
            Zrób zdjęcie
          </Button>
        </Grid>
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
