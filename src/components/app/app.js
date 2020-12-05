import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import "./app.scss";

const Game = React.lazy(() => import("../../pages/game/game"));

export default function App() {
  return (
    <React.Suspense fallback="Loading...">
      <Switch>
        <Route exact path="/game" component={Game} />
      </Switch>
    </React.Suspense>
  );
}
