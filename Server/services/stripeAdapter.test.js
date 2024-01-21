jest.mock("./adapters/pagamentoInterface");
jest.mock("../models/utente");
const StripeMock = {};
StripeMock.checkout = {
    sessions:{
        retrieve : jest.fn((id) => null)
    }
}
jest.mock("stripe", () => {
    return jest.fn().mockImplementation(() => {
        return StripeMock;
    });
});

const utente = require("../models/utente");
const stripe = require("stripe")

const StripeAdapter = require('./stripeAdapter');

describe('StripeAdapter', () => {
    let stripeAdapter;

    beforeEach(() => {
        stripeAdapter = new StripeAdapter();
    });

    it('verificaPagamento dovrebbe dare errore se non trova il pagamento', async () => {
        const idUtente = 'testUserId';
        const idPagamento = 'testPaymentId';
        StripeMock.checkout.sessions.retrieve = jest.fn(() => Promise.resolve(null))



        utente.cambiaAbbonamento = jest.fn().mockResolvedValue();

        const result = await stripeAdapter.verificaPagamento(idUtente, idPagamento);

        expect(result.success).toBe(false);
        expect(result.message).toBe('Errore: il pagamento non è stato trovato.');
    });

    it('verificaPagamento dovrebbe dare errore se non è stato effettuato il pagamento', async () => {
        const idUtente = 'testUserId';
        const idPagamento = 'testPaymentId';
        StripeMock.checkout.sessions.retrieve = jest.fn(() => Promise.resolve({metadata:1, payment_status : 'no'}))



        utente.cambiaAbbonamento = jest.fn().mockResolvedValue();

        const result = await stripeAdapter.verificaPagamento(idUtente, idPagamento);

        expect(result.success).toBe(false);
        expect(result.message).toBe('Errore: il pagamento non è stato effettuato.');
    });

    it('verificaPagamento va a buon fine', async () => {
        const idUtente = 'testUserId';
        const idPagamento = 'testPaymentId';
        StripeMock.checkout.sessions.retrieve = jest.fn(() => Promise.resolve({metadata:1, payment_status : 'paid'}))



        utente.cambiaAbbonamento = jest.fn().mockResolvedValue();

        const result = await stripeAdapter.verificaPagamento(idUtente, idPagamento);

        expect(result.success).toBe(true);
        expect(result.message).toBe('Cambio abbonamento effettuato con successo.');
    });

});