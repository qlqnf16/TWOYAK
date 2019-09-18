import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./routes";
import DrugStore from "./contexts/DrugStore";
import AuthStore from "./contexts/AuthStore";
import WatchStore from "./contexts/WatchStore";
import { Helmet } from "react-helmet";

import Navbar from "./components/Navbars/Navbar";
import Header from "./components/Navbars/Header";
import Block from "./components/UI/Block";
import Spinner from "./components/UI/Spinner";

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
      </Helmet>
      <AuthStore>
        <DrugStore>
          <WatchStore>
            {/* {window.innerWidth >= 960 ? (
              <Block />
            ) : (
                <> */}
            <Header />
            <Navbar />
            {switchRoutes}
            {/* </>
              )} */}
          </WatchStore>
        </DrugStore>
      </AuthStore>
    </div>
  );
}

export default App;
