// cd Users\hroueche\Documents\Code\Démotz\Projet AP\app\backend

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitiliazed: false
});


//===============EXPRESS=================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());


//===============MONGODB=================
mongoose.connect('mongodb://127.0.0.1:27017/ProjetAP', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})


//===============ROUTES=================
const lessonsRouter = require('./routes/lessons');
const usersRouter = require('./routes/users');
const subjectsRouter = require('./routes/subjects');
const classesRouter = require('./routes/classes');
const rolesRouter = require('./routes/roles');
const professorsRouter = require('./routes/professors.js');

app.use('/lessons', lessonsRouter);
app.use('/users', usersRouter);
app.use('/subjects', subjectsRouter);
app.use('/classes', classesRouter);
app.use('/roles', rolesRouter);
app.use('/professors', professorsRouter)


//===============PORT=================
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


