const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    classe: { type: String, required: true },
    role: { type: String, required: true }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

