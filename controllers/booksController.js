const db = require("../models");

module.exports = {
    //find and display all books
    findAll: (req, res) => {
        // console.log(req.body);
        db.Book
            .find().sort({date: -1})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    //added newly saved books into the database
    create: (req, res) => {
        db.Book.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    //remove individual book from database
    remove: (req, res) => {
        db.Book.remove({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    update: (req, res) => {
        db.Book.update({_id: req.params.id}, {status: req.body.status})
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    }
}