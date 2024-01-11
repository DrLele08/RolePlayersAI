const multer = require("multer");
const loginController = require("../../api/controllers/login");
module.exports = app => {
    const router = require("express").Router();
    const loginController = require("../controllers/login");

    router.get("/", loginController.PaginaLogin);
    router.post("/", multer().any(), loginController.LoginControl);
    app.use("/login", router);
}