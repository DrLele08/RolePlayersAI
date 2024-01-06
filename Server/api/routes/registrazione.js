module.exports = app => {
    const router = require("express").Router();
    const registrazioneControl = require("../controllers/registrazione");

    router.post("/", registrazioneControl.CreateUtente);

    app.use("/api/registrazione", router);
}