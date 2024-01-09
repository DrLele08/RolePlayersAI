module.exports = app => {
    const router = require("express").Router();
    // const multer= require('multer');
    const middlewareAuth= require("../../middleware/authApi");
    const inventarioControl = require("../controllers/inventario");

    router.get("/", middlewareAuth([1, 2, 3]), inventarioControl.getInventario);
    router.post("/add/:idContenuto", middlewareAuth([1, 2, 3], inventarioControl.addContenuto));
    router.post("/remove/:idContenuto", middlewareAuth([1, 2, 3], inventarioControl.removeContenuto));

    app.use("/api/inventario", router);
}