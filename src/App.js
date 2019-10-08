import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";
import DrugStore from "./contexts/DrugStore";
import AuthStore from "./contexts/AuthStore";
import WatchStore from "./contexts/WatchStore";
import { Helmet } from "react-helmet";

import Navbar from "./components/Navbars/Navbar";
import Header from "./components/Navbars/Header";
import favicon from "./assets/favicon.png";

function App() {
  const switchRoutes = (
    <Switch>
      <WatchStore>
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
      </WatchStore>
    </Switch>
  );

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="투약을 통해 의약품 복용 이력을 관리하고 의약품 안전 정보를 확인하세요 :)"
        />
        <meta
          name="keywords"
          content="투약,의약품,의약품 안전,의약품 복용,아이약,우울증약,약,같이먹어도되는지,임산부약"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="투약" />
        <meta property="og:title" content="투약" />
        <meta
          property="og:decription"
          content="의약품 복용 이력을 관리하고 의약품 안전 정보를 확인하세요 :)"
        />
        <meta property="og:image" content={favicon} />
      </Helmet>
      <AuthStore>
        <DrugStore>
          <Header />
          <Navbar />
          {switchRoutes}
        </DrugStore>
      </AuthStore>
    </div>
  );
}

export default App;
