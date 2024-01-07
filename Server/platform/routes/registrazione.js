module.exports = app => {
    const router = require("express").Router();
    const registrazioneControl = require("../controllers/registrazione");

    router.get("/", registrazioneControl.PaginaRegistrazione);

    app.use("/registrazione", router);
}