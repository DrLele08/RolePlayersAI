module.exports = app => {
    const router = require("express").Router();
    const middlewareAuth= require("../../middleware/authApi");
    const sessioneControl = require("../controllers/sessione");

    router.get("/getByUtente/:idUtente", middlewareAuth([1, 2, 3]), sessioneControl.getByUtente);

    app.use("/api/sessione", router);
}