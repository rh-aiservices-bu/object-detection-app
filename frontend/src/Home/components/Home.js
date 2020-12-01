import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Link } from "@material-ui/core";

import "./Home.scss";

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

  return (
    <div className="home">
      <div>
        <Button
          variant="contained"
          size="large"
          color="default"
          className={classes.margin}
          href="/video"
        >
          {" "}
          Video Feed
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          size="large"
          color="default"
          className={classes.margin}
          href="/photo"
        >
          {" "}
          Snapshot
        </Button>
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
