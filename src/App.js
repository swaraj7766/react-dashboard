import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./Container/Dashboard/Dashboard";
import { Counter } from "./features/counter/Counter";

import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";

const NotFound = () => {
  return <div>NotFound</div>;
};

const DashboardRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <MainLayout>
          <Component {...matchProps} />
        </MainLayout>
      )}
    />
  );
};

const EmptyRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <EmptyLayout>
          <Component {...matchProps} />
        </EmptyLayout>
      )}
    />
  );
};

function App() {
  return (
    <Router>
      <Switch>
        <DashboardRoute exact path="/" component={Dashboard} />
        <DashboardRoute exact path="/dashboard" component={Dashboard} />
        <DashboardRoute exact path="/table" component={Counter} />
        <EmptyRoute component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
