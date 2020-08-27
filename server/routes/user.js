const express = require("express");
const router = express.Router();
const { User, ToDos } = require("../models/index");

router.post("/", (req, res) => {
    const { name, age } = req.body;

    User.create({
        name,
        age,
    }).then((user) => {
        res.json(user);
    });
});

router.get("/:name", (req, res) => {
    const { name } = req.params;

    User.findOne({ where: { name: name } })
        .then((user) => {
            return ToDos.findAll({ where: { authorId: user.id } });
        })
        .then((todos) => {
            res.json(todos);
        })
        .catch((err) => console.log(err));
});

module.exports = router;
