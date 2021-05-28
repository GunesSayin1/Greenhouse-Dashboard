import React from "react";
import { Route, Redir, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("access_token")) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
        if (
          parseJwt(localStorage.getItem("access_token")).identity.includes("maintenance")
        ) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
