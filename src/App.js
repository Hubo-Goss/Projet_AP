import React, { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkLoggedIn } from './redux/actions/userActions.js';
import { connect, useDispatch, useSelector } from 'react-redux';

import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import LessonsList from "./components/calendar.component";
import EditLessons from "./components/edit-lesson.component";
import CreateLesson from "./components/create-lesson.component";
import CreateUser from "./components/create-user.component";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("useEffect de App.js")
    dispatch(checkLoggedIn())
  }, []);

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
        <Route path="/calendar" component={LessonsList} />
        <Route path="/edit/" component={EditLessons} />
        <Route path="/create_lesson" component={CreateLesson} />
        <Route path="/create_user" component={CreateUser} />
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
