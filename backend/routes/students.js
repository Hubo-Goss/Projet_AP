const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find({ role: "Student" })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;