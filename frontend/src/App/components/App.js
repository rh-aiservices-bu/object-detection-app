import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getStatus } from "../actions";
import Routes from "../../Routes";

import "./App.scss";

function App({ status, getStatus }) {
  useEffect(() => {
    getStatus();
  }, []); // eslint-disable-line

  return (
    <div className="app">
      <Routes />
    </div>
  );
}

function mapStateToProps(state) {
  return state.appReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    getStatus: () => {
      dispatch(getStatus());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
