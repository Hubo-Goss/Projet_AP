const router = require('express').Router();
let Subject = require('../models/subject.model');
const needsRole = require('../roleMiddleware');

router.route('/').get((req, res) => {
    Subject.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res, next) => needsRole(req, res, next, ['Admin']), (req, res) => {
    const subjectName = req.body.subjectName;

    const newSubject = new Subject({ subjectName });
    newSubject.save()
        .then(() => res.json('Subject added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res, next) => needsRole(req, res, next, ['Admin']), (req, res) => {
    console.log("c'est rentré")
    Subject.findByIdAndDelete(req.params.id)
        .then(() => res.json('Subject deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

