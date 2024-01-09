class pagamentoInterface{
    effettuaPagamento(idUtente, abbonamento) {
        throw new Error("Metodo effettuaPagamento() deve essere implementato");
    }

    verificaPagamento(idUtente,idPagamento){
        throw new Error("Metodo verificaPagamento() deve essere implementato");
    }
}

module.exports = pagamentoInterface