const router = require('express').Router();
let Classe = require('../models/classe.model');

router.route('/').get((req, res) => {
    Classe.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const classeName = req.body.classeName;

    const newClasse = new Classe({ classeName });
    newClasse.save()
        .then(() => res.json('Classe added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

