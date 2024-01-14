jest.mock("../models/messaggio");
jest.mock("../models/conversazione");
jest.mock("../models/utente");
jest.mock("../models/chatGPT");

const messaggio = require("../models/messaggio");
const chatGPT = require("../models/chatGPT");
const utente = require("../models/utente");
const conversazione=require("../models/conversazione");

const messaggioService = require('./messaggioService');

const faker = require('@faker-js/faker').faker;

const MESSAGGIO_MAX_LENGTH = 512;

describe('messaggioService', () => {
    describe('inviaMessaggio', () => {
        utente.getById.mockImplementation(async (userId) => {
            return {
                idUtente: 1,
                msgRimanenti: 100
            };
        });

        conversazione.getById.mockImplementation((id) => {
            return Promise.resolve({
                idConversazione: 1,
                getSessione: jest.fn().mockResolvedValue({
                    idSessione: 1,
                    fkUtente: 1
                })
            });
        });

        messaggio.createMessaggio.mockImplementation((dati) => {});

        utente.updateMsgRimanenti.mockImplementation((dati) => {});

        messaggioService.buildListMessaggi = jest.fn().mockImplementation((dati)=>{
            return [{"role": "user", "content": "fakeContent"}, {"role": "assistant", "content": "fakeContent"}];
        });

        it('dovrebbe fallire se i dati non sono presenti', async () => {
            await expect(messaggioService.inviaMessaggio(null)).rejects.toBe("Dati non validi");
        });

        let mockJson1 = {
            idUtente: faker.number.int({min:1}),
            messaggio: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGTH)
        };
        it('dovrebbe fallire se tra i dati manca idConversazione', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson1)).rejects.toBe("Dati non validi");
        });

        let mockJson2 = {
            idConversazione: faker.number.int({min:1}),
            messaggio: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGTH)
        };
        it('dovrebbe fallire se tra i dati manca idUtente', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson2)).rejects.toBe("Dati non validi");
        });

        let mockJson3 = {
            idUtente: faker.number.int({min:1}),
            idConversazione: faker.number.int({min:1})
        };
        it('dovrebbe fallire se tra i dati manca messaggio', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson3)).rejects.toBe("Dati non validi");
        });

        let mockJson4={
            idConversazione: -1,
            idUtente: faker.number.int({min:1}),
            messaggio: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGTH)
        };
        it('dovrebbe fallire se l`ID della conversazione non è valido', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson4)).rejects.toBe("ID non valido");
        });

        let mockJson5={
            idConversazione: faker.number.int({min:1}),
            idUtente: -1,
            messaggio: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGTH)
        };
        it('dovrebbe fallire se l`ID dell`utente non è valido', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson5)).rejects.toBe("ID non valido");
        });

        let mockJson6={
            idConversazione: 1,
            idUtente: 2,
            messaggio: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGTH)
        };
        it('dovrebbe fallire se la conversazione non appartiene all`utente', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson6)).rejects.toBe("La conversazione non appartiene ad una sessione dell`utente");
        });

        let mockJson7={
            idConversazione: 1,
            idUtente: 1,
            messaggio: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGTH)
        };
        it('dovrebbe fallire se l`utente ha 0 messaggi rimanenti', async () => {
            utente.getById.mockImplementationOnce(async (userId) => {
                return {
                    idUtente: 1,
                    msgRimanenti: 0
                };
            });
            await expect(messaggioService.inviaMessaggio(mockJson7)).rejects.toBe("0 Messaggi Rimanenti");
        });

        let mockJson8={
            idConversazione: 1,
            idUtente: 1,
            messaggio: ""
        };
        it('dovrebbe fallire se la lunghezza del messaggio è < 1', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson8)).rejects.toBe("Lunghezza messaggio non valida");
        });

        let mockJson9={
            idConversazione: 1,
            idUtente: 1,
            messaggio: faker.lorem.words(MESSAGGIO_MAX_LENGTH+1)
        };
        it('dovrebbe fallire se la lunghezza del messaggio è > 512', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson9)).rejects.toBe("Lunghezza messaggio non valida");
        });

        let mockJson={
            idConversazione: 1,
            idUtente: 1,
            messaggio: "Hello World!"
        };
        it('Dovrebbe inviare il messaggio correttamente', async () => {
            chatGPT.inviaMessaggio.mockResolvedValue({
                content: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGTH)
            });
            await expect(messaggioService.inviaMessaggio(mockJson)).resolves.toBeDefined();
        });


    });
});