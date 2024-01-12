module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authApi");
    const conversazione=require("../controllers/conversazione.js");

    /**
     * Ottiene i messaggi di una conversazione paginati.
     *
     * @route {GET} /api/conversazione/getMessaggi
     * @group Conversazione - Operazioni relative alle conversazioni
     * @param {Array<number>} middlewareAuth - Array contenente i ruoli consentiti per l'autenticazione API (1=Utente, 2=Moderatore, 3=Amministratore).
     * @return {Object} - Restituisce un oggetto contenente i messaggi paginati della conversazione e informazioni sulla paginazione.
     */
    router.get("/getMessaggi", middlewareAuth([1,2,3]), conversazione.GetMessages);

    /**
     * Ottiene una conversazione per ID.
     *
     * @route {GET} /api/conversazione/:idConversazione
     * @group Conversazione - Operazioni relative alle conversazioni
     * @param {Array<number>} middlewareAuth - Middleware per l'autenticazione API (ruoli: [1=Utente, 2=Moderatore, 3=Amministratore]).
     * @param {number} idConversazione - L'ID univoco della conversazione che si desidera recuperare.
     * @return {Object} - Restituisce un oggetto contenente i dettagli della conversazione.
     */
    router.get("/:idConversazione", middlewareAuth([1,2,3]), conversazione.GetById);

    /**
     * Invia un messaggio e ottiene una risposta
     *
     * @route {POST} /api/conversazione/inviaMessaggio
     * @group Conversazione - Operazioni relative alle conversazioni
     * @param {Array<number>} middlewareAuth - Middleware per l'autenticazione API (ruoli: [1=Utente, 2=Moderatore, 3=Amministratore]).
     * @return {Object} - Restituisce un oggetto contenente la risposta.
     */
    router.post("/inviaMessaggio", middlewareAuth([1,2,3]), conversazione.InviaMessaggio);

    app.use("/api/conversazione",router);
};