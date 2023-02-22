const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    state: { type: Boolean, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    from: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    to: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Task', taskSchema);