const mongoose = require('mongoose')

const users = require('../Models/userSchema')

// content schema creation 
const contentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    blogType: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            }],
    comments: [{
        commenter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        // likes: {
        //     type: Number,
        //     default: 0
        // },
        comment: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    }]
})
const contents = mongoose.model("contents", contentSchema)

module.exports = contents