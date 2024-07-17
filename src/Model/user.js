const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});
const activitesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const usuarioSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    starts_at: {
        type: Date,
        required: true
    },
    ends_at: {
        type: Date,
        required: true
    },
    owner_name: {
        type: String,
        required: true
    },
    owner_email: {
        type: String,
        required: true
    },
    emails_to_invite: {
        type: [String],
        default: []
    },
    important_links: {
        type: [linkSchema],
        default: []
    },
    activites: {
        type: [activitesSchema],
        default: []
    },
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
