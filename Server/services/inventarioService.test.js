jest.mock('../models/utente'); // Simula il modulo utente
jest.mock('../models/utils'); // Simula il modulo utils
jest.mock('../models/creazione'); // Simula il modulo creazione
jest.mock('../models/contesto'); //Simula il modulo contesto

const inventarioService = require('../services/inventarioService.js');
const utente = require('../models/utente'); // Importa il modulo utente
describe('inventarioService', () => {
    describe('addContenuto',()=>{
        it('addContenuto dovrebbe rigettare quando sia idCreazione che idContesto mancano o sono forniti insieme', async () => {
            const data = { idUtente: 1 };

            await expect(inventarioService.addContenuto(data)).rejects.toEqual("Devi fornire uno tra idCreazione e idContesto!");
        });

        it('addContenuto dovrebbe rigettare quando utente non ha i permessi', async () => {
            const data = { idUtente: 1, idCreazione: 2 };

            utente.getById.mockResolvedValue({}); // Simula il risultato di utente.getById

            inventarioService.checkUtenteAndCreazione = jest.fn().mockImplementation((dati) => {
                return {
                    fkUtente:2,
                    isPubblico:false
                }
            });

            await expect(inventarioService.addContenuto(data)).rejects.toEqual("Non hai i permessi!");
        });

        it('addContenuto dovrebbe rigettare quando utente non ha i permessi', async () => {
            const data = { idUtente: 1, idContesto: 2 };

            utente.getById.mockResolvedValue({}); // Simula il risultato di utente.getById

            inventarioService.checkUtenteAndContesto = jest.fn().mockImplementation((dati) => {
                return {
                    fkUtente:2,
                    isPubblico:false
                }
            });

            await expect(inventarioService.addContenuto(data)).rejects.toEqual("Non hai i permessi!");
        });

        it('addContenuto dovrebbe rigettare quando Creazione/Contesto è già in inventario', async () => {
            const data = { idUtente: 1, idCreazione: 2 };

            utente.getById.mockResolvedValue({
                hasCreazione: jest.fn().mockImplementation((_)=>{
                    return true;
                })
            }); // Simula il risultato di utente.getById

            inventarioService.checkUtenteAndCreazione = jest.fn().mockImplementation((_) => {
                return {
                    fkUtente:1,
                    isPubblico:false
                }
            });

            await expect(inventarioService.addContenuto(data)).rejects.toEqual("Creazione già presente nell'Inventario!");
        });

        it('addContenuto dovrebbe rigettare quando Creazione/Contesto è già in inventario', async () => {
            const data = { idUtente: 1, idContesto: 2 };

            utente.getById.mockResolvedValue({
                hasContesto: jest.fn().mockImplementation((_)=>{
                    return true;
                })
            }); // Simula il risultato di utente.getById

            inventarioService.checkUtenteAndContesto = jest.fn().mockImplementation((_) => {
                return {
                    fkUtente:1,
                    isPubblico:false
                }
            });

            await expect(inventarioService.addContenuto(data)).rejects.toEqual("Contesto già presente nell'Inventario!");
        });

        it('addContenuto Creazione va a buon fine', async() =>{
            const data = { idUtente: 1, idCreazione: 2 };

            utente.getById.mockResolvedValue({
                hasCreazione: jest.fn().mockImplementation((_)=>{
                    return false;
                }),
                addCreazione: jest.fn().mockImplementation((_)=>{
                    return Promise.resolve({});
                })
            }); // Simula il risultato di utente.getById

            inventarioService.checkUtenteAndCreazione = jest.fn().mockImplementation((_) => {
                return {
                    fkUtente:1,
                    isPubblico:false
                }
            });

            await expect(inventarioService.addContenuto(data)).resolves.toBeDefined();
        })

        it('addContenuto Contesto va a buon fine', async() =>{
            const data = { idUtente: 1, idContesto: 2 };

            utente.getById.mockResolvedValue({
                hasContesto: jest.fn().mockImplementation((_)=>{
                    return false;
                }),
                addContesto: jest.fn().mockImplementation((_)=>{
                    return Promise.resolve({});
                })
            }); // Simula il risultato di utente.getById

            inventarioService.checkUtenteAndContesto = jest.fn().mockImplementation((_) => {
                return {
                    fkUtente:1,
                    isPubblico:false
                }
            });

            await expect(inventarioService.addContenuto(data)).resolves.toBeDefined();
        })
    });
});
