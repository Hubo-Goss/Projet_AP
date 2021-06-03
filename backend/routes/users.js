const router = require('express').Router();
const User = require('../models/user.model');
const passport = require('passport');
const bcrypt = require('bcryptjs');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const classe = req.body.classe;
    const role = req.body.role;
    const newUser = new User({ firstName, lastName, email, password, classe, role });

    User.findOne({ email })
        .then(user => {
            if (!user) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash
                        newUser.save()
                            .then((user) => {
                                req.session.userId = user.id
                                return res.status(200).json({
                                    success: true
                                })
                            })
                            .catch(err => res.status(400).json('Error' + err));
                    })
                })

            }
        }).catch(err => console.log(err))
});

router.post('/login',
    function (req, res, next) {
        console.log("salutsalut")
        console.log(req.body)
        console.log('================')
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log(req.body)
        const user = JSON.parse(JSON.stringify(req.user))
        const cleanUser = Object.assign({}, user)
        if (cleanUser.password) {
            console.log(`Deleting ${cleanUser.password}`)
            delete cleanUser.password
        }
        res.status(200).json({ user: cleanUser })
    });

router.post('/logout', (req, res) => {
    req.logOut();
    req.session.destroy(() =>
        res.status(200).json({ msg: 'logging you out' })
    )
})

module.exports = router;

