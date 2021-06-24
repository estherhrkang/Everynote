import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SigninFormPage from "./components/SigninFormPage";
import SignupFormPage from "./components/SignupFormPage";
import NotebookPage from "./components/NotebookPage";
import ShowNotes from "./components/NotebookPage/ShowNotes";
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
      <div className='root__main-container'>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            {/* <Route exact path='/'>
              Home
            </Route> */}
            <Route exact path='/'>
              <SigninFormPage />
            </Route>
            <Route path='/signup'>
              <SignupFormPage />
            </Route>
            <Route path='/notebooks'>
              <NotebookPage />
            </Route>
            <Route path='/notebooks/:notebookid/notes'>
              <ShowNotes />
            </Route>
            <Route path='/notes'>
              <NotePage />
            </Route>
            <Route>
              Page does not exist.
            </Route>
          </Switch>
        )}
      </div>
    </>
  );
};

export default App;
