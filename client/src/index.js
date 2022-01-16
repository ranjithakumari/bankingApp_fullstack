import { StrictMode } from "react";
import ReactDOM from "react-dom";
import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

//import reportWebVitals from "./reportWebVitals";
import App from "./App";

ReactDOM.render(
  <StrictMode>    
      <App />    
  </StrictMode>,
  document.getElementById("root")  
);


