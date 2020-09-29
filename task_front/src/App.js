import React, { useState } from "react";
import AllList from "./AllList";
import "./App.css";

import Button from "react-bootstrap/Button";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Card from "./Onecard.js";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import Header from "./Header";

const listById = gql`
  query getListById($id: ID!) {
    getListById(id: $id) {
      id
      url
      title
      text
    }
  }
`;

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

  const { data, loading } = useQuery(listById, {
    variables: {
      id: selectedList,
    },
  });

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Header setSelectedList={setSelectedList} />
        </header>
        <Card></Card>
        <AllList onSelect={(list) => setSelectedList(list.id)} />
      </div>
    </Router>
  );
}

export default App;
