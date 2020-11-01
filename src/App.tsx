import "date-fns";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Routes from "./routes";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <div className="App">
          <Routes />
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}

export default App;
