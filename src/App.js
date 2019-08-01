import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";
import DrugStore from "./contexts/DrugStore";
import AuthStore from "./contexts/AuthStore";
import WatchStore from "./contexts/WatchStore";

import Navbar from "./components/Navbars/Navbar";
import Header from "./components/Navbars/Header";

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

  return (
    <AuthStore>
      <DrugStore>
        <WatchStore>
          <Header />
          <Navbar />
          {switchRoutes}
        </WatchStore>
      </DrugStore>
    </AuthStore>
  );
}

export default App;
