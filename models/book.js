const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    //some books don't have authors, so required is false
    //will write a method to convert unknown author to anonymous
    author: {
        type: Array,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    //need a placeholder image
    image: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;