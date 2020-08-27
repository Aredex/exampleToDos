const Sequelize = require("sequelize");
const s = Sequelize;
const db = new Sequelize("postgres://postgres:password@localhost:5432/todos", {
    logging: false,
});

const User = db.define("user", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
});

const ToDos = db.define("todos", {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

ToDos.belongsTo(User, { as: "author" });

db.sync({ force: false });

module.exports = {
    User,
    ToDos,
    db,
};
