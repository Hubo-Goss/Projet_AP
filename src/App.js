import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component"
import LessonsList from "./components/lessons-list.component";
import EditLessons from "./components/edit-lesson.component";
import CreateLesson from "./components/create-lesson.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /><br />
        <Route path="/" exact component={LessonsList} />
        <Route path="/edit/" component={EditLessons} />
        <Route path="/create-lesson" component={CreateLesson} />
        <Route path="/create-user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
