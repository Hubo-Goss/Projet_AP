const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');

module.exports = function (passport) {
    passport.use("local",
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email }).then(user => {
                if (!user) {
                    return (console.log("passports.js : Pas d'utilisateur existant avec cette adresse Email"),
                        done(null, false, { message: 'That email is not register' }))
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw (console.log("passports.js : erreur (mot de passe pas decrypté)"),
                        err);
                    if (isMatch) {
                        return (console.log("passports.js : connecté (email correct et mot de passe decrypté)"),
                            done(null, user));
                    }
                    else {
                        return (console.log("passports.js : mot de passe incorrect"),
                            done(null, false, { message: 'Password incorrect' }))
                    }
                })
            }).catch(err => console.log(err))
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}