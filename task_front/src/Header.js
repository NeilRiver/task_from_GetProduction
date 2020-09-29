import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import {
  Switch,
  Link,
  useHistory,
} from "react-router-dom";

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      <Button
        style={{
          border: "1px solid darkred",
          minWidth: "120px",
          alignSelf: "center",
          marginRight: "16px",
        }}
        variant="dark"
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Bat Off
      </Button>
    </p>
  ) : (
    <p style={{ marginRight: "16px" }}>You are not logged in</p>
  );
}

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

function Header(props) {
  return (
    <Nav
      style={{
        background: "rgba(0, 33, 55, 0.3)",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link>
          <Link onClick={() => props.setSelectedList()} to="/">
            Batcave
          </Link>
        </Nav.Link>
      </Nav.Item>
      <Switch>
        <AuthButton />
      </Switch>
    </Nav>
  );
}

export default Header;
