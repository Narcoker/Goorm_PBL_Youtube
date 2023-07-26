import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import NavBar from "./views/NavBar/NavBar";
import Sidebar from "./views/Sidebar/Sidebar";
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function Main() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "56px", minHeight: "calc(100vh - 80px)" }}>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default Main;
