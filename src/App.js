import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes";
import DrugStore from "./contexts/DrugStore";

function App() {
  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return (
          <Route
            path={prop.path}
            component={prop.component}
            exact={prop.exact}
            key={key}
          />
        );
      })}
    </Switch>
  );

  return <DrugStore>{switchRoutes}</DrugStore>;
}

export default App;
