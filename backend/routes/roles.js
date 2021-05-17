const router = require('express').Router();
let Role = require('../models/role.model');

router.route('/').get((req, res) => {
    Role.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const description = req.body.description;

    const newRole = new Role({ description });
    newRole.save()
        .then(() => res.json('Role added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

