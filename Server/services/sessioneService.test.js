jest.mock("../models/sessione");
jest.mock("../models/utente");
jest.mock("../models/contesto");


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
            await expect(sessioneService.createSessione(null).reject.toBe("Dati non validi!"));
        })

        utente.getById.mockImplementation(async(idUtente)=>{
            return {
                idUtente: 1
            }
        })

        contesto.getContestoById.mockImplementation(async(idContesto)=>{
            return {
                idContesto: 1
            }
        })


        let mockJsonIdUtenteNotValid = {
            idUtente: -1,
            idContesto: faker.number.int({min:1}),
            titolo: faker.lorem.word({length: {min: 1, max: 255}})
        }
        it('Dovrebbe fallire se IdUtente non è valido' , async()=>{
            await expect(sessioneService.createSessione(mockJsonIdUtenteNotValid).reject.toBe("Id Utente non valido"));
        });

        let mockJsonIdContestoNotValid = {
            idUtente: faker.number.int({min:1}),
            idContesto: -1,
            titolo: faker.lorem.word({length: {min: 1, max: 255}})
        }
        it('Dovrebbe fallire se IdContesto non è valido' , async()=>{
            await expect(sessioneService.createSessione(mockJsonIdContestoNotValid).reject.toBe("Id Contesto non valido"));
        });

        let mockJsonIdUtenteNull ={
            idContesto: 1,
            titolo: faker.lorem.word({length: {min: 1, max: 255}})
        };
        it('Dovrebbe fallire se fra i dati manca idUtente', async()=>{
            await expect(sessioneService.createSessione(mockJsonIdUtenteNull).reject.toBe("Dati non validi"));
        });


        let mockJsonIdContestoNull ={
            idUtente: 1,
            titolo: faker.lorem.word({length: {min: 1, max: 255}})
        };
        it('Dovrebbe fallire se fra i dati manca idContesto', async()=>{
            await expect(sessioneService.createSessione(mockJsonIdContestoNull).reject.toBe("Dati non validi"));
        });


        let mockJsonTitleNotValid = {
            idUtente: 1,
            idContesto: 1,
            titolo: faker.lorem.words(255)
        }
        it('Dovrebbe fallire se il formato del titolo non è valido', async() =>{
            await expect(sessioneService.createSessione(mockJsonTitleNotValid).reject.toBe("Formato titolo non valido!"));
        })

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
