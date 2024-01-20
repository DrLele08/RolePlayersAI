const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.CHAT_GPT_KEY,
});

/**
 * Oggetto che contiene le funzioni per interagire con l`API di OpenAI GPT
 * @namespace
 * @property {Function} inviaMessaggio - Funzione per
 * inviare un messaggio a GPT e ricevere una risposta
 */
const chatGPT = {};

/**
 * Invia una richiesta di completamento chat ad OpenAI GPT
 * @async
 * @function
 * @param {Array} listaMessaggi - Una lista di messaggi nella conversazione
 * @return {Promise<String>} La risposta genarata da GPT
 * @throws {Error} Se non è possibile ottenere una risposta da GPT
 *
 * @example
 * const messaggi = [
 *   { role: "system", content: "Utente inizia la conversazione." },
 *   { role: "user", content: "Qual è il significato della vita?" },
 *   { role: "assistant", content: "Il significato della vita è..." }
 * ];
 * try {
 *   const risultato = await chatGPT.inviaMessaggio(messaggi);
 *   console.log(risultato);
 * } catch (errore) {
 *   console.error(errore);
 * }
 *
 */
chatGPT.inviaMessaggio = async (listaMessaggi) => {
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: listaMessaggi,
    max_tokens: 130,
  });
  if (chatCompletion.choices !== undefined && chatCompletion.choices.length > 0) {
    return chatCompletion.choices[0].message;
  }

  return Promise.reject(new Error('Errore CHAT GPT'));
};

module.exports = chatGPT;
