// cd Users\hroueche\Documents\Code\Démotz\Projet_AP\Projet_AP\backend

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
require('./passport')(passport);
const session = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});


//===============EXPRESS=================//
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());


//===============MONGODB=================//
mongoose.connect('mongodb://127.0.0.1:27017/ProjetAP', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})


//===============ROUTES=================//
const lessonsRouter = require('./routes/lessons');
const usersRouter = require('./routes/users');
const subjectsRouter = require('./routes/subjects');
const classesRouter = require('./routes/classes');
const rolesRouter = require('./routes/roles');
const professorsRouter = require('./routes/professors.js');

app.use('/api/lessons', lessonsRouter);
app.use('/api/users', usersRouter);
app.use('/api/subjects', subjectsRouter);
app.use('/api/classes', classesRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/professors', professorsRouter)


//===============PORT=================//
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


