import React, { Suspense, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage.js";
import NavBar from "./views/NavBar/NavBar";
import Sidebar from "./views/Sidebar/Sidebar";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage";
import SubscribePage from "./views/SubscribePage/SubscribePage";
import MyVideoPage from "./views/MyVideoPage/MyVideoPage";
import SearchVideoPage from "./views/SearchVideoPage/SearchVideoPage";
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function Main() {
  const [searchVideos, setSearchVideos] = useState([]);
  const [curPage, setCurPage] = useState("/");
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar setSearchVideos={setSearchVideos} />
      <div style={{ paddingTop: "56px", minHeight: "calc(100vh - 80px)" }}>
        <Sidebar curPage={curPage} setCurPage={setCurPage} />
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/subscribe" component={Auth(SubscribePage, true)} />
          <Route exact path="/myvideo" component={Auth(MyVideoPage, true)} />
          <Route exact path="/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route
            exact
            path="/search"
            render={(props) => {
              const AuthComponent = Auth(SearchVideoPage, null);
              return <AuthComponent {...props} searchVideos={searchVideos} />;
            }}
          />
        </Switch>
      </div>
    </Suspense>
  );
}

export default Main;
