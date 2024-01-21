jest.mock("./adapters/pagamentoInterface");
jest.mock('stripe')('sk_test_51OURuIHOFfOlBPkf5Zoi0O0G9o3OmzAHZ3plZCPzBpa2C8PYevvdYc9DgAHKmG1dqHGvhEfAzihtwUc1zPjabuRb00i0nGIHy3');
jest.mock("../models/utente");
jest.mock('stripe');

const utente = require("../models/utente");
const { faker } = require('@faker-js/faker');

const StripeAdapter = require('./stripeAdapter');

describe('StripeAdapter', () => {
    let stripeAdapter;

    beforeEach(() => {
        stripeAdapter = new StripeAdapter();
    });

    test('effettuaPagamento should return a success response with session URL', async () => {
        const idUtente = 'testUserId';
        const abbonamento = { idAbbonamento: 'testSubscriptionId', nomeTier: 'Basic', prezzo: 9.99 };

        const result = await stripeAdapter.effettuaPagamento(idUtente, abbonamento);

        expect(result.success).toBe(true);
        expect(result.sessionUrl).toBeDefined();
    });

    test('verificaPagamento should return a success response after successful payment', async () => {
        const idUtente = 'testUserId';
        const idPagamento = 'testPaymentId';

        // Mocking the stripe.checkout.sessions.retrieve method
        stripe.checkout.sessions.retrieve = jest.fn().mockResolvedValue({
            metadata: { idAbbonamento: 'testSubscriptionId' },
            payment_status: 'paid',
        });

        // Mocking utente.cambiaAbbonamento method
        utente.cambiaAbbonamento = jest.fn().mockResolvedValue();

        const result = await stripeAdapter.verificaPagamento(idUtente, idPagamento);

        expect(result.success).toBe(true);
        expect(result.message).toBe('Cambio abbonamento effettuato con successo.');
    });

    test('verificaPagamento should return a failure response if payment is not successful', async () => {
        const idUtente = 'testUserId';
        const idPagamento = 'testPaymentId';

        // Mocking the stripe.checkout.sessions.retrieve method
        stripe.checkout.sessions.retrieve = jest.fn().mockResolvedValue({
            metadata: { idAbbonamento: 'testSubscriptionId' },
            payment_status: 'failed',
        });

        const result = await stripeAdapter.verificaPagamento(idUtente, idPagamento);

        expect(result.success).toBe(false);
        expect(result.message).toBe('Errore: il pagamento non è stato effettuato.');
    });

    // Add more tests as needed

});