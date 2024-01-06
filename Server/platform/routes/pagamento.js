module.exports=app=>{
    const router=require("express").Router();
    const middlewareAuth=require("../../middleware/authPlatform");
    const pagamento=require("../controllers/pagamento");

    //Route per effettuare il pagamento, l'idAbbonamento sarebbe quello del DB
    router.get("/:idAbbonamento",middlewareAuth([1,2,3]),pagamento.EffettuaPagamento);

    //Route per verificare la correttezza del pagamento, idPagamento è id transazione Stripe
    router.get("/verify/:idUtente/:idPagamento",pagamento.VerificaPagamento);


    app.use("/pagamento",router);
};