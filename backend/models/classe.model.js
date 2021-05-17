const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classeSchema = new Schema({
    classeName: { type: String, required: true, unique: true }
}, {
    timestamps: true,
});


const Classe = mongoose.model('Classe', classeSchema);

module.exports = Classe;
