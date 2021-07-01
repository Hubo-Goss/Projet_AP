const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    professorId: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    subject: { type: String, required: true },
    classe: { type: String, required: true },
    maxStudent: { type: Number, required: true },
    date: { type: Date, required: true },
    registeredStudents: { type: Array, required: true }
}, {
    timestamps: true,
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
