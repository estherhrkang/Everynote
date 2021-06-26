import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import NotebookPage from "./components/MainPage/NotebookPage";
import NoteShow from "./components/MainPage/NoteShow";
import NotePage from "./components/NotePage";

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
              <NoteShow />
              </Route>
              <Route path='/notebooks'>
              <NotebookPage />
              </Route>
              <Route path='/notes'>
              <NotePage />
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
