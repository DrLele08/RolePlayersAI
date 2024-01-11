module.exports = app => {
    const router = require("express").Router();
    const multer= require('multer');
    const middlewareAuth= require("../../middleware/authApi");
    const adminControl = require("../controllers/admin");

    router.get("/getUtenti", middlewareAuth([3]), adminControl.getUtenti);
    router.post("/setRuolo", multer().any(), middlewareAuth([3]), adminControl.setRuolo);

    app.use("/api/admin", router);
}