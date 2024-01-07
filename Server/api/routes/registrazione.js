module.exports = app => {
    const router = require("express").Router();
    const registrazioneControl = require("../controllers/registrazione");
    const multer=require('multer');

    router.post("/", multer().any(), registrazioneControl.createUtente);

    app.use("/api/registrazione", router);
}