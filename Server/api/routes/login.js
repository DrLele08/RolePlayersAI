module.exports = app => {
    const router = require("express").Router();
    const loginController = require("../controllers/login");

    router.post("/", loginController.LoginControl);

    app.use("/api/login", router);
}