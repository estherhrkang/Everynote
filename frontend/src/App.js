import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";

import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch])

  return (
    <>
        {isLoaded && (
          <Switch>
            <Route exact path='/'>
              <SigninPage />
            </Route>
            <Route path='/signup'>
              <SignupPage />
            </Route>
            <Route 
              exact
              path={[
                '/notebooks',
                '/notebooks/:notebookid/notes',
                '/notes',
                '/notes/:id'
              ]}
            >
              <MainPage isLoaded={isLoaded} />
            </Route>
            <Route>
              Page does not exist.
            </Route>
          </Switch>
        )}
    </>
  );
};

export default App;
