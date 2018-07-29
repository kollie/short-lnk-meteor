import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

window.browserHistory = history;

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];

import Signup from "../ui/Signup";
import Link from "../ui/Link";
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";

const onEnterPublicPage = () => {
  if (Meteor.userId()) {
    browserHistory.replace("/links");
  }
};

const onEnterPrivatePage = () => {
  if (!Meteor.userId()) {
    browserHistory.replace("/");
  }
};

export const onAuthChange = isAuthenticated => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace("/links");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace("/");
  }
  // console.log("isAuthenticated", isAuthenticated, location.pathname)
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          onEnterPublicPage();
          return <Login />;
        }}
      />
      <Route
        path="/signup"
        render={() => {
          onEnterPublicPage();
          return <Signup />;
        }}
      />
      <Route
        path="/links"
        render={() => {
          onEnterPrivatePage();
          return <Link />;
        }}
      />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
