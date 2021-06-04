const router = require('express').Router();
const User = require('../models/user.model');
const passport = require('passport');
const bcrypt = require('bcryptjs');
// const needsRole = function (role) {
//     return function (req, res, next) {
//         axios.get(`http://localhost:5000/api/users/${req.user}`)
//         if (req.user && req.user.role === role)
//             next();
//         else
//             res.send(401, 'Unauthorized')
//     }
// }
//     axios.delete(`http://localhost:5000/api/lessons/${lessonId}`)
//         .then(res => console.log(res.data));
// }

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    // needsRole('Admin');
    console.log('~~~~~~~~')
    console.log(req.user)
    console.log('~~~~~~~~')

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
        console.log("routes : users : .post/login")
        console.log("====================================================================================")
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log("====================================================================================")
        console.log(".authenticate")
        const user = JSON.parse(JSON.stringify(req.user))
        const cleanUser = Object.assign({}, user)
        console.log(cleanUser.role)
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

