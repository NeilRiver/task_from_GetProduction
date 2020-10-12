import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";

function AuthButton(props) {
  let history = useHistory();

  return props.fakeAuth.isAuthenticated ? (
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
          props.fakeAuth.signout(() => history.push("/"));
        }}
      >
        Bat Off
      </Button>
    </p>
  ) : (
    <p style={{ marginRight: "16px" }}>You are not logged in</p>
  );
}

function Header(props) {

  let history = useHistory();

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
          <Link onClick={() => history.push("/")}>Batcave</Link>
        </Nav.Link>
      </Nav.Item>
      <AuthButton fakeAuth={props.fakeAuth} />
    </Nav>
  );
}

export default Header;
