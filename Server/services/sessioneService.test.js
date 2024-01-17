jest.mock("../models/sessione");
jest.mock("../models/utente");
jest.mock("../models/contesto");
jest.mock("./conversazioneService");


const sessione = require("../models/sessione");
const sessioneService = require("./sessioneService");
const utente = require("../models/utente");
const contesto = require("../models/contesto");


const faker = require('@faker-js/faker').faker;

describe('sessioneService', () => {
    describe('createSessione', () => {
        sessione.createSessione.mockResolvedValue({
            sessione: "nuovaSessione"
        });

        it('dovrebbe fallire se i dati non sono presenti', async() =>{
            await expect(sessioneService.createSessione(null)).rejects.toBe("Dati non validi!");
        });


        utente.getById.mockImplementation(async()=>{
            return {
                idUtente: 1
            }
        });

        contesto.getContestoById.mockImplementation(async()=>{
            return {
                idContesto: 1
            }
        });

        sessione.createSessione.mockImplementation(()=>{
            return Promise.resolve({
                idSessione: 1,
                getContesto: jest.fn().mockImplementation(()=>{
                    return Promise.resolve({
                        getCreaziones: jest.fn().mockResolvedValue([])
                    });
                })
            });
        });

        let mockJsonIdUtenteNotValid = {
            idUtente: -1,
            idContesto: faker.number.int({min:1}),
            titolo: faker.lorem.word({length: {min: 1, max: 255}})
        }
        it('Dovrebbe fallire se IdUtente non è valido' , async()=>{
            await expect(sessioneService.createSessione(mockJsonIdUtenteNotValid)).rejects.toBe("ID utente non valido!");
        });

        let mockJsonIdContestoNotValid = {
            idUtente: faker.number.int({min:1}),
            idContesto: -1,
            titolo: faker.lorem.word({length: {min: 1, max: 255}})
        }
        it('Dovrebbe fallire se IdContesto non è valido' , async()=>{
            await expect(sessioneService.createSessione(mockJsonIdContestoNotValid)).rejects.toBe("ID contesto non valido!");
        });

        let mockJsonIdUtenteNull ={
            idContesto: 1,
            titolo: faker.lorem.word({length: {min: 1, max: 255}})
        };
        it('Dovrebbe fallire se fra i dati manca idUtente', async()=>{
            await expect(sessioneService.createSessione(mockJsonIdUtenteNull)).rejects.toBe("Dati non validi!");
        });


        let mockJsonIdContestoNull ={
            idUtente: 1,
            titolo: faker.lorem.word({length: {min: 1, max: 255}})
        };
        it('Dovrebbe fallire se fra i dati manca idContesto', async()=>{
            await expect(sessioneService.createSessione(mockJsonIdContestoNull)).rejects.toBe("Dati non validi!");
        });


        let mockJsonTitleNotValid = {
            idUtente: 1,
            idContesto: 1,
            titolo: faker.lorem.words(255)
        }
        it('Dovrebbe fallire se il formato del titolo non è valido', async() =>{
            await expect(sessioneService.createSessione(mockJsonTitleNotValid)).rejects.toBe("Titolo non valido! Deve essere una stringa alfanumerica di massimo 255 caratteri.");
        });

        let mockJsonValid ={
            idUtente: faker.number.int({min:1}),
            idContesto: faker.number.int({min:1}),
            titolo: faker.lorem.word({length:{min: 1, max: 255}})
        };
        it('Dovrebbe creare correttamente una sessione', async()=>{
            await expect(sessioneService.createSessione(mockJsonValid)).resolves.toBeDefined();
        });

    })
})
