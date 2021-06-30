// cd Users\hroueche\Documents\Code\Démotz\Projet_AP\Projet_AP\backend

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
require('./passport')(passport);
const cookieParser = require('cookie-parser');
const session = require('express-session')


//===============EXPRESS=================//
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(cookieParser()); //Permet de lire les cookies (doit être appelé avant "app.use(express.static('public'));")
app.use(express.static('public'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
        //sameSite: true,
        secure: false
    }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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


