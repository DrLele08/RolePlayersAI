jest.mock('../models/utente'); // Simula il modulo utente
jest.mock('../models/utils'); // Simula il modulo utils
jest.mock('../models/creazione'); // Simula il modulo creazione
jest.mock('../models/contesto'); //Simula il modulo contesto

const inventarioService = require('../services/inventarioService.js');
const utente = require('../models/utente'); // Importa il modulo utente
describe('inventarioService.addContenuto', () => {
    it('addContenuto dovrebbe rigettare quando sia idCreazione che idContesto mancano o sono forniti insieme', async () => {
        const data = { idUtente: 1 };

        await expect(inventarioService.addContenuto(data)).rejects.toEqual("Devi fornire uno tra idCreazione e idContesto!");
    });

    it('addContenuto dovrebbe rigettare quando utente non ha i permessi', async () => {
        const data = { idUtente: 1, idCreazione: 2 };

        utente.getById.mockResolvedValue({}); // Simula il risultato di utente.getById

        await expect(inventarioService.addContenuto(data)).rejects.toEqual("Dati non validi!");
    });

    it('addContenuto dovrebbe rigettare quando utente non ha i permessi', async () => {
        const data = { idUtente: 1, idContesto: 2 };

        utente.getById.mockResolvedValue({}); // Simula il risultato di utente.getById

        await expect(inventarioService.addContenuto(data)).rejects.toEqual("Dati non validi!");
    });

    it('addContenuto dovrebbe rigettare quando Creazione/Contesto è già in inventario', async () => {
        const data = { idUtente: 1, idCreazione: 2 };

        utente.getById.mockResolvedValue({}); // Simula il risultato di utente.getById
        utente.hasCreazione.mockResolvedValue(true); // Simula il risultato di utente.hasCreazione

        await expect(inventarioService.addContenuto(data)).rejects.toEqual("Dati non validi!");
    });

    it('addContenuto dovrebbe rigettare quando Creazione/Contesto è già in inventario', async () => {
        const data = { idUtente: 1, idContesto: 2 };

        utente.getById.mockResolvedValue({}); // Simula il risultato di utente.getById
        utente.hasCreazione.mockResolvedValue(true); // Simula il risultato di utente.hasCreazione

        await expect(inventarioService.addContenuto(data)).rejects.toEqual("Dati non validi!");
    });

    it('addContenuto va a buon fine', async() =>{
        const data = { idUtente: 1, idCreazione: 2 };

        utente.getById.mockResolvedValue({}); // Simula il risultato di utente.getById
        utente.hasCreazione.mockResolvedValue(false); // Simula il risultato di utente.hasCreazione
    })

    it('addContenuto va a buon fine', async() =>{
        const data = { idUtente: 1, idContesto: 2 };

        utente.getById.mockResolvedValue({}); // Simula il risultato di utente.getById
        utente.hasCreazione.mockResolvedValue(false); // Simula il risultato di utente.hasCreazione
    })
});
