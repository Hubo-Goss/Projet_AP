import React, { useEffect, Fragment, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkLoggedIn } from './redux/actions/userActions.js';
import { connect, useDispatch, useSelector } from 'react-redux';

import Navbar from "./pages/navbar";
import Login from "./pages/login";
import Calendar from "./pages/calendar";
import EditLessons from "./pages/edit-lesson";
import CreateLesson from "./pages/create-lesson";
import CreateUser from "./pages/create-user";
import MyLessons from "./pages/my-lessons";
import SubjectsManager from "./pages/subjects-manager.js"

function App() {
  const stableDispatch = useCallback(useDispatch(), [])

  //
  useEffect(() => {
    stableDispatch(checkLoggedIn())
  }, [stableDispatch]);

  const user = useSelector(state => state.user.userInfo)

  const hasToLogIn = (
    <Fragment>
      <Login />
    </Fragment>
  )

  const loggedIn = (
    <Fragment>
      <Navbar />
    </Fragment>
  )

  return (

    <Router>
      <div className="App">
        {user ? loggedIn : hasToLogIn}
        <Route path="/login" exact component={Login} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/edit/" component={EditLessons} />
        <Route path="/create_lesson" component={CreateLesson} />
        <Route path="/create_user" component={CreateUser} />
        <Route path="/my_lessons" component={MyLessons} />
        <Route path="/subjects_manager" component={SubjectsManager} />
      </div>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { checkLoggedIn })(App);
