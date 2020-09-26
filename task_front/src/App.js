import React from "react";
import AllList from "./AllList";
import "./App.css";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";


const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
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
    <div style={{height:'100vh', margin:'15px'}}>
      <p>You must log in to view the page at {from.pathname}</p>
      
      <Button style={{border:'1px solid darkred', minWidth:'120px', alignSelf: 'center', marginRight:'16px' }}variant="dark"  onClick={login}>
          Log in
      </Button>


    </div>
  );
}

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
     
      <Button style={{border:'1px solid darkred', minWidth:'120px', alignSelf: 'center', marginRight:'16px' }}variant="dark"  onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}>
              Bat Off
            </Button>
    </p>
  ) : (<p style={{marginRight:'16px'}}>You are not logged in</p>);
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
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


function App() {
  return (
    <Router>
    <div className="App">
      
      <header className="App-header">
        <Nav
          style ={{background:'rgba(0, 33, 55, 0.3)',width: '100%', justifyContent: 'space-between', alignItems: 'baseline'}}
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item>
            <Nav.Link>
              <Link to="/">Batcave</Link>
            </Nav.Link>
          </Nav.Item>
          <Switch>
            
          <AuthButton />

          {/* <Link to="/login"> 
            <Button style={{minWidth:'120px', alignSelf: 'center', marginRight:'16px' }}variant="dark">
              Bat In
              
            </Button>
            </Link> */}
      
            </Switch>
        </Nav>
      </header>
      <Switch>
        <Route path="/login">
            <LoginPage />
        </Route>
        <PrivateRoute path="/">
        <AllList />
          </PrivateRoute>
      </Switch>
    </div>
     
    </Router>
  );
}

export default App;
