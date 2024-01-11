module.exports = app => {
    const router = require("express").Router();
    const multer= require('multer');
    const middlewareAuth= require("../../middleware/authApi");
    const inventarioControl = require("../controllers/inventario");

    router.get("/", middlewareAuth([1, 2, 3]), inventarioControl.getInventario);
    router.post("/add", multer().any(), middlewareAuth([1, 2, 3]), inventarioControl.addContenuto);
    router.post("/remove", multer().any(), middlewareAuth([1, 2, 3]), inventarioControl.removeContenuto);

    app.use("/api/inventario", router);
}