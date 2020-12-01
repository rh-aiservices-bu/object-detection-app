import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Video = lazy(() => import("../../Video"));
const Photo = lazy(() => import("../../Photo"));

const Routes = () => (
  <Suspense
    fallback={
      <div className="route-loading">
        <h1>Loading...</h1>
      </div>
    }
  >
    <Switch>
      <Route exact path="/">
        <Redirect to="/photo" />
      </Route>
      <Route path="/photo" exact component={Photo} />
      <Route path="/video" exact component={Video} />
    </Switch>
  </Suspense>
);

export default Routes;
