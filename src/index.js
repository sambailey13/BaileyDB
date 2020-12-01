import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css"
import SelectMovie from "./Components/selectMovie"


ReactDOM.render(
  <React.Fragment>
    <SelectMovie />
  </React.Fragment>,
  document.getElementById("root")
);

serviceWorker.unregister();
