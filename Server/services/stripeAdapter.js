const pagamentoInterface = require('./adapters/pagamentoInterface');
const stripe = require('stripe')('sk_test_51OURuIHOFfOlBPkf5Zoi0O0G9o3OmzAHZ3plZCPzBpa2C8PYevvdYc9DgAHKmG1dqHGvhEfAzihtwUc1zPjabuRb00i0nGIHy3');
const utente = require('../models/utente');

class stripeAdapter extends pagamentoInterface {
  async effettuaPagamento(idUtente, abbonamento) {
    const baseUrl = process.env.BASE_URL;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Abbonamento ${abbonamento.nomeTier}`,
              images: ['https://extensionsforjoomla.com/images/stories/virtuemart/product/stripe-checkout.png'],
            },
            unit_amount: Math.round(abbonamento.prezzo * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        idAbbonamento: abbonamento.idAbbonamento,
      },
      mode: 'payment',
      success_url: `${baseUrl}/pagamento/verify/${idUtente}/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/error.html`,
    });
    return { success: true, sessionUrl: session.url };
  }

  async verificaPagamento(idUtente, idPagamento) {
    const session = await stripe.checkout.sessions.retrieve(idPagamento);

    try {
      const { idAbbonamento } = session.metadata;

      if (session.payment_status === 'paid') {
        // Tutto ok, cambiare tipo abbonamento
        await utente.cambiaAbbonamento(idUtente, idAbbonamento);
        return { success: true, message: 'Cambio abbonamento effettuato con successo.' };
      }
      // Errore, non hai pagato
      return { success: false, message: 'Errore: il pagamento non è stato effettuato.' };
    } catch (error) {
      return { success: false, message: 'Errore: il pagamento non è stato trovato.' };
    }
  }
}

module.exports = stripeAdapter;
