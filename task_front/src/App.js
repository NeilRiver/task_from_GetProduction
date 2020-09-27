import React,{ useState } from "react";
import AllList from "./AllList";
import "./App.css";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styles from './AllList.module.scss'
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";


const listById = gql` query getListById($id: ID!) {
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
  }
};


function LoginPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } } ;
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

function Child(props) {

  let { id } = useParams();

  return (
    <div style={{height:'100vh'}}className={styles.getAllList}>
    <div className={styles.wrap}>
    <div className={styles.avatar} style={{backgroundImage: `url(${props.url})`}}> </div>
      <div className={styles.subtitle}>
      {props.title} id[{id}]
        <div>
        {props.text}
        </div>
        </div>
      </div>
  </div>

  );
}


function App() {

  const [selectedList, setSelectedList] = useState();

  
  const { data, loading } = useQuery(listById, {
    variables: {
      id: selectedList
    }
  });
  
  console.log('ByID-->',data)
  return (
    <Router>
    <div className="App">
      
      <header className="App-header">
        <Nav
          style ={{background:'rgba(0, 33, 55, 0.3)',width: '100%', justifyContent: 'space-between', alignItems: 'baseline'}}
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <Nav.Item>
            <Nav.Link > 
              <Link onClick={()=>setSelectedList()} to="/">Batcave</Link>
            </Nav.Link>
          </Nav.Item >
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


     

     
          {selectedList && data !== undefined
          ?
          <>
        <Switch>
          
          <Route path="/:id" children={<Child 
          title = {data.getListById.title}
          text = {data.getListById.text}
          url = {data.getListById.url}
          />} 
          
          />
         
        </Switch> 
        <Redirect
             to={{
               pathname: '/'+data.getListById.id
              
             }}
           />
        </>
          :<AllList onSelect={list => setSelectedList(list.id)} />
          }
          </PrivateRoute>
      </Switch>
    </div>
     
    </Router>
  );
}

export default App;
