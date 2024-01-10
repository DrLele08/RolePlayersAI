module.exports = app => {
    const router = require("express").Router();
    const loginController = require("../controllers/login");
    const multer=require('multer');

    router.post("/", multer().any(), loginController.LoginControl);

    app.use("/api/login", router);
}