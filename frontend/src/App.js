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
        {/* <MainPage isLoaded={isLoaded} /> */}

        {isLoaded && (
          <Switch>

            {/* <Route exact path='/'>
              Home
            </Route> */}

            <Route exact path='/'>
              <SigninPage />
            </Route>
            <Route path='/signup'>
              <SignupPage />
            </Route>

            {/* <Route>
              <NoteInNotebookShow />
              </Route>
              <Route path='/notebooks'>
              <NotebookPage />
              </Route>
              <Route path='/notes'>
              <NoteAllShow />
            </Route> */}

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
