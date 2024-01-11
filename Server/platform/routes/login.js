module.exports = app => {
    const router = require("express").Router();
    const loginController = require("../controllers/login");

    router.get("/", loginController.PaginaLogin);

    app.use("/login", router);
}