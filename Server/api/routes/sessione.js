module.exports = app => {
    const router = require("express").Router();
    const multer=require('multer');
    const middlewareAuth= require("../../middleware/authApi");
    const sessioneControl = require("../controllers/sessione");

    router.get("/getByUtente/:idUtente", middlewareAuth([1, 2, 3]), sessioneControl.getByUtente);
    router.post("/create", multer().any(), middlewareAuth([1, 2, 3]), sessioneControl.createUtente);

    app.use("/api/sessione", router);
}