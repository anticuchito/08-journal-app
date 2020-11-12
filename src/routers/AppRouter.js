import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { firebase } from "../firebase/firebase-config";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { startLoading } from "../actions/notes";
export const AppRouter = () => {
  const dispatch = useDispatch();

  const [check, setCheck] = useState(true);

  const [isLogged, setIsLogged] = useState(false);

  //se ejecuta el callback una sola vez por que es un observable
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLogged(true);

       
        dispatch(startLoading(user.uid));
      } else {
        setIsLogged(false);
      }
      setCheck(false);
    });
  }, [dispatch, setCheck]);

  if (check) {
    return <h1>Please wait...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoutes
            component={JournalScreen}
            exact path="/"
            isAuthenticated={isLogged}
          />
          <PublicRoutes
            component={AuthRouter}
            path="/auth"
            isAuthenticated={isLogged}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
