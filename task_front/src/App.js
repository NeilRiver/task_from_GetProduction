import React, { useState } from "react";
import AllList from "./AllList";
import "./App.css";
import Button from "react-bootstrap/Button";
import Card from "./CardWrapper.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Header from "./Header";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div style={{ height: "100vh", margin: "15px" }}>
      <p>You must log in to view the page at {from.pathname}</p>

      <Button
        style={{
          border: "1px solid darkred",
          minWidth: "120px",
          alignSelf: "center",
          marginRight: "16px",
        }}
        variant="dark"
        onClick={login}
      >
        Log in
      </Button>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  const [selectedList, setSelectedList] = useState();

  return (
    <Router>
      <div className="App">
        <Header setSelectedList={setSelectedList} />
        <Switch>
          <Route path="/:id">
            <Card />
          </Route>
          <Route path="/">
            <AllList onSelect={(list) => setSelectedList(list.id)} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
