const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');

module.exports = function (passport) {
    passport.use("local",
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email }).then(user => {
                if (!user) {
                    console.log("Mauvaise adresse mail (fichier : passports.js)");
                    return done(null, false, { message: 'That email is not register' })
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw (console.log("Mot de passe pas decrypté (fichier : passports.js)"),
                        err);
                    if (isMatch) {
                        console.log("Connecté (fichier : passports.js)")
                        return done(null, user);
                    }
                    else {
                        console.log("Mot de passe incorrect (fichier : passports.js)")
                        return done(null, false, { message: 'Incorrect password' })
                    }
                })
            }).catch(err => console.log(err))
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
        console.log(``)
        console.log(`============> serializeUser() :`)
        // console.log(`___1___ user : ${user}`)
        // console.log(`___2___ user.id : ${user.id}`)
    });

    passport.deserializeUser((id, done) => {
        console.log(``)
        console.log(`============> deserializeUser() :`)
        User.findById(id, function (err, user) {
            // console.log(`___3___ user : ${user}`)
            // console.log(`___4___ user.id : ${id}`)
            done(err, user);
        });
    });
}