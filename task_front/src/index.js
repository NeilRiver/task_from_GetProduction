import React from "react";
import { render } from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

function Index() {
  return <App />;
}

render(<Index />, document.getElementById("root"));
