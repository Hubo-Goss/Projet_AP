const router = require('express').Router();
let Lesson = require('../models/lesson.model');
const needsRole = require('../roleMiddleware');

router.route('/').get((req, res) => {
    Lesson.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res, next) => needsRole(req, res, next, ['Admin', 'Professor']), (req, res) => {
    const professorId = req.body.professorId;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const subject = req.body.subject;
    const classe = req.body.classe;
    const maxStudent = req.body.maxStudent;
    const date = req.body.date;

    const newLesson = new Lesson({ professorId, description, duration, subject, classe, maxStudent, date });

    newLesson.save()
        .then(() => res.json('Lesson added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Lesson.findById(req.params.id)
        .then(lesson => res.json(lesson))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Lesson.findByIdAndDelete(req.params.id)
        .then(() => res.json('Lesson deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Lesson.findById(req.params.id)
        .then(lesson => {
            lesson.professorId = req.body.professorId;
            lesson.description = req.body.description;
            lesson.duration = Number(req.body.duration);
            lesson.subject = req.body.subject;
            lesson.classe = req.body.classe;
            lesson.maxStudent = req.body.maxStudent;
            lesson.date = Date.parse(req.body.date);

            lesson.save()
                .then(() => res.json('Lesson updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

