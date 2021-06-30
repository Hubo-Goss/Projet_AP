const router = require('express').Router();
const User = require('../models/user.model');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const needsRole = require('../roleMiddleware');

router.route('/').get((req, res) => {
    console.log('~~~~~~~~USER~~~~~~~~')
    console.log(req.user)
    if (req.user) {
        return res.status(200).json({ user: req.user })
    } else {
        return res.status(200).json({ user: null })
    }
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res, next) => needsRole(req, res, next, ['Admin']), (req, res) => {
    // console.log('cookie', req.cookies);
    // console.log('============')
    // console.log(req.user)
    // console.log('~~~~~~~~')

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
    passport.authenticate('local'),
    (req, res) => {
        // console.log("===============================================")
        // console.log(".authenticate")
        const user = JSON.parse(JSON.stringify(req.user))
        const cleanUser = Object.assign({}, user)
        console.log(`role : ${cleanUser.role}`)
        if (cleanUser.password) {
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

