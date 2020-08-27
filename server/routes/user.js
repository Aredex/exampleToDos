const express = require("express");
const router = express.Router();
const { User, ToDos } = require("../models/index");

router
    .route("/")
    .post((req, res) => {
        const { name, age } = req.body;

        User.create({
            name,
            age,
        })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                res.json({ err: "Hay un error" });
            });
    })
    .put((req, res) => {
        const { id } = req.query;

        ToDos.findOne({
            where: { id: id },
        })
            .then((todo) => {
                todo.completed = true;
                todo.title = "Cualquier cosa 4";
                return todo.save();
            })
            .then((todo) => {
                res.json(todo);
            });
    })
    .delete((req, res) => {
        const { id } = req.query;

        ToDos.findOne({
            where: { id: id },
        }).then((todo) => {
            todo.destroy();
            res.json("destuido");
        });
    });

router
    .route("/:name")
    .get((req, res) => {
        const { name } = req.params;

        User.findOne({ where: { name: name } })
            .then((user) => {
                return ToDos.findAll({ where: { authorId: user.id } });
            })
            .then((todos) => {
                res.json(todos);
            })
            .catch((err) => {
                res.json({ err: "Hay un error" });
            });
    })
    .post((req, res) => {
        const { title, description } = req.body;
        const { name } = req.params;
        let id;

        User.findOne({ where: { name: name } })
            .then((user) => {
                id = user.id;
                return ToDos.create({
                    title,
                    description,
                });
            })
            .then((createdToDo) => {
                return createdToDo.setAuthor(id);
            })
            .then((todo) => {
                res.json(todo);
            });
    });

module.exports = router;
