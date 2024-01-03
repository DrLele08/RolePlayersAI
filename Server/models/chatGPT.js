const OpenAI = require("openai").OpenAI;

const openai = new OpenAI({
    apiKey: process.env.CHAT_GPT_KEY
});

const chatGPT={};


/**
 * Invia una richiesta di completamento chat ad OpenAI GPT-3.5 Turbo
 * @async
 * @function
 * @param {Array} listaMessaggi - Una lista di messaggi nella conversazione
 * @return {Promise<>} Una promise che si risolve con la risposta generata
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
chatGPT.inviaMessaggio=async(listaMessaggi)=>{
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: listaMessaggi
    });
    if(chatCompletion.choices !== undefined && chatCompletion.choices.length>0) {
        return chatCompletion.choices[0].message;
    }
    else {
        return Promise.reject("Errore CHAT GPT");
    }
};