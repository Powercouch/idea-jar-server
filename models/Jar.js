const mongoose = require('mongoose');
const { updatedAt } = require('./plugins');

const ideaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

ideaSchema.plugin(updatedAt);

const jarSchema = new mongoose.Schema({
    slug: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    ideas: [ideaSchema],
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

jarSchema.plugin(updatedAt);

module.exports = mongoose.model('Jar', jarSchema);
