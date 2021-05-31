import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkLoggedIn } from './redux/actions/userActions.js';
import { connect } from 'react-redux';

import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import LessonsList from "./components/lessons-list.component";
import EditLessons from "./components/edit-lesson.component";
import CreateLesson from "./components/create-lesson.component";
import CreateUser from "./components/create-user.component";

function App() {
  useEffect(() => {
    checkLoggedIn()
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar /><br />
        <Route path="/" exact component={Login} />
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
