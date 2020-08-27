const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const users = require("./routes/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", users);

app.listen(PORT, () => {
    console.log("Server is listening on port", PORT);
});

app.post("/user", (req, res) => {});
