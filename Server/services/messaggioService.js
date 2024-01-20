const messaggio = require('../models/messaggio');
const conversazione = require('../models/conversazione');
const utente = require('../models/utente');
const chatGPT = require('../models/chatGPT');
const utils = require('../models/utils');

const messaggioService = {};
const requiredFields = ['idConversazione', 'idUtente', 'messaggio'];

messaggioService.inviaMessaggio = async (dati) => {
  // Verifica Parametri obbligatori
  if (!utils.checkParameters(dati, requiredFields)) {
    return Promise.reject('Dati non validi');
  }

  // Controllo ID
  if (!utils.checkId(dati.idConversazione) || !utils.checkId(dati.idUtente)) {
    return Promise.reject('ID non valido');
  }

  // Controllo appartenenza della sessione
  const conv = await conversazione.getById(dati.idConversazione);
  const sess = await conv.getSessione();
  if (sess.fkUtente !== dati.idUtente) {
    return Promise.reject('La conversazione non appartiene ad una sessione dell`utente');
  }

  // Controllo messaggi rimanenti
  const user = await utente.getById(dati.idUtente);
  if (user.msgRimanenti < 1) {
    return Promise.reject('0 Messaggi Rimanenti');
  }

  // Controllo lunghezza messaggio
  dati.messaggio = dati.messaggio.trim();
  if (dati.messaggio.length < 1 || dati.messaggio.length > 512) {
    return Promise.reject('Lunghezza messaggio non valida');
  }

  // Costruisci lista messaggi
  let listMessaggi = [];
  listMessaggi = await messaggioService.buildListMessaggi(dati);

  // Salva messaggio inviato
  await messaggio.createMessaggio({
    fkConversazione: dati.idConversazione,
    corpo: dati.messaggio,
    isUtente: true,
  });

  // Invia Lista Messaggi a ChatGPT e aspetta la risposta
  const risposta = await chatGPT.inviaMessaggio(listMessaggi);

  // Aggiorna Messaggi Rimanenti
  const msgRimanenti = user.msgRimanenti - 1;
  await utente.updateMsgRimanenti(user.idUtente, msgRimanenti);

  // Salva la risposta nel DB e restituisci la risposta
  await messaggio.createMessaggio({
    fkConversazione: dati.idConversazione,
    corpo: risposta.content,
    isUtente: false,
  });

  return {
    risposta: risposta.content,
    msgRimanenti,
  };
};

// Funzione che costruisce la lista di messaggi da dare in input a ChatGPT
messaggioService.buildListMessaggi = async (dati) => {
  // Inserisce tutti i messaggi system nella lista
  let listMessaggi = [];
  listMessaggi = await buildSystemListMessaggi(dati);

  // Recupera i messaggi dal DB e li inserisce nella lista
  const messaggi = await messaggio.getByConversazione(dati.idConversazione);
  for (let i = 0; i < messaggi.length; i++) {
    if (messaggi[i].isUtente) {
      listMessaggi.push({
        role: 'user',
        content: messaggi[i].corpo,
      });
    } else {
      listMessaggi.push({
        role: 'assistant',
        content: messaggi[i].corpo,
      });
    }
  }

  // Inserisci il messaggio appena inviato nella lista
  listMessaggi.push({
    role: 'user',
    content: `Rispondi in modo breve e conciso ma rispettando la personalità del personaggio che interpreti: ${dati.messaggio}`,
  });

  return listMessaggi;
};

// Funzione per costruire tutti i messaggi system da inserire nella lista di messaggi da inviare a ChatGPT
async function buildSystemListMessaggi(dati) {
  const listMessaggi = [];
  const conv = await conversazione.getById(dati.idConversazione);
  const sessione = await conv.getSessione();
  const contesto = await sessione.getContesto();
  const ambiente = await contesto.getAmbiente();
  const personaggi = await contesto.getCreaziones();
  const relazioniPersonaggi = await contesto.getRelazioniPersonaggi();
  const personaggioConversazione = await conv.getPersonaggio();

  // Descrizione Ambiente
  listMessaggi.push({
    role: 'system',
    content: `Ambiente in cui si svolge la conversazione: ${ambiente.nome}`,
  });
  listMessaggi.push({
    role: 'system',
    content: `Descrizione dell\`ambiente: ${ambiente.descrizione}`,
  });

  // Descrizione di tutti i personaggi
  let nomiPersonaggi = 'Nell`ambiente ci sono i seguenti personaggi: ';
  for (let i = 0; i < personaggi.length; i++) {
    nomiPersonaggi += personaggi[i].nome;
    if (i < personaggi.length - 1) {
      nomiPersonaggi += ', ';
    }
  }
  listMessaggi.push({
    role: 'system',
    content: nomiPersonaggi,
  });
  for (let i = 0; i < personaggi.length; i++) {
    listMessaggi.push({
      role: 'system',
      content: `Descrizione di ${personaggi[i].nome}: ${personaggi[i].descrizione
      }(sesso di ${personaggi[i].nome}: ${personaggi[i].sesso})`,
    });
  }

  // Informazioni sulle relazioni
  for (let i = 0; i < relazioniPersonaggi.length; i++) {
    const p1 = await relazioniPersonaggi[i].getPersonaggio1();
    const p2 = await relazioniPersonaggi[i].getPersonaggio2();
    listMessaggi.push({
      role: 'system',
      content: `Relazione tra ${p1.nome} e ${p2.nome}: ${relazioniPersonaggi[i].descrizione}`,
    });
  }

  // Descrizione Contesto
  listMessaggi.push({
    role: 'system',
    content: `La situazione iniziale è la seguente: ${contesto.descrizione}`,
  });
  listMessaggi.push({
    role: 'system',
    content: `Da questo momento dovrai rispondere impersonando ${personaggioConversazione.nome
    } e rispettando tutte le descrizioni e le relazioni fornite. Le risposte dovranno essere brevi `
            + `e concise ma dovranno rispettare la personalità di ${personaggioConversazione.nome}`,
  });

  return listMessaggi;
}

module.exports = messaggioService;
