const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    description: { type: String, required: true, unique: true }
}, {
    timestamps: true,
});


const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
