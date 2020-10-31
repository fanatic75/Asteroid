import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";


const Routes= () => {
    return (
        <>
            <Route exact path="/" component={Login}  />
            <Route exact path="/dashboard" component={Dashboard}  />

            <Route exact path="/SignUp" component={SignUp}  />

        </>
    )
}

export default Routes;