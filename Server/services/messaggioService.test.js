const messaggioService = require('./messaggioService');
const faker = require('@faker-js/faker').faker;

const MESSAGGIO_MAX_LENGHT = 512;

//messaggio: faker.word.sample({min:1,max:50})
//messaggio: faker.lorem.word({length:{min:1, max:MESSAGGIO_MAX_LENGHT}})

describe('messaggioService', () => {

    describe('inviaMessaggio', () => {

        //const mockIdUtente = faker.number.int({min:1, max:2});

        it('dovrebbe fallire se i dati non sono presenti', async () => {
            await expect(messaggioService.inviaMessaggio(null)).rejects.toBe("Dati non validi");
        });

        let mockJson1 = {
            idUtente: faker.number.int({min:1,max:2}),
            messaggio: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGHT)
        };
        it('dovrebbe fallire se tra i dati manca idConversazione', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson1)).rejects.toBe("Dati non validi");
        });

        let mockJson2 = {
            idConversazione: faker.number.int({min:1,max:4}),
            messaggio: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGHT)
        };
        it('dovrebbe fallire se tra i dati manca idUtente', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson2)).rejects.toBe("Dati non validi");
        });

        let mockJson3 = {
            idUtente: faker.number.int({min:1,max:2}),
            idConversazione: faker.number.int({min:1,max:4})
        };
        it('dovrebbe fallire se tra i dati manca messaggio', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson3)).rejects.toBe("Dati non validi");
        });

        let mockJson4={
            idConversazione: -1,
            idUtente: faker.number.int({min:1,max:2}),
            messaggio: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGHT)
        };
        it('dovrebbe fallire se l`ID della conversazione non è valido', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson4)).rejects.toBe("ID non valido");
        });

        let mockJson5={
            idConversazione: faker.number.int({min:1,max:4}),
            idUtente: -1,
            messaggio: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGHT)
        };
        it('dovrebbe fallire se l`ID dell`utente non è valido', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson5)).rejects.toBe("ID non valido");
        });

        let mockJson6={
            idConversazione: 1,
            idUtente: 1,
            messaggio: ""
        };
        it('dovrebbe fallire se la lunghezza del messaggio è < 1', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson6)).rejects.toBe("Lunghezza messaggio non valida");
        });

        let mockJson7={
            idConversazione: 1,
            idUtente: 1,
            messaggio: faker.lorem.words(MESSAGGIO_MAX_LENGHT+1) //TODO: genera 512 word (non caratteri)
        };
        it('dovrebbe fallire se la lunghezza del messaggio è > 512', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson7)).rejects.toBe("Lunghezza messaggio non valida");
        });

        let mockJson8={
            idConversazione: 3,
            idUtente: 2,
            messaggio: faker.lorem.text().slice(0, MESSAGGIO_MAX_LENGHT)
        };
        it('dovrebbe fallire se la conversazione non appartiene all`utente', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson8)).rejects.toBe("La conversazione non appartiene ad una sessione dell`utente");
        });

        let mockJson={
            idConversazione: 1,
            idUtente: 1,
            messaggio: "Hello World!"
        };
        it('Dovrebbe inviare il messaggio correttamente', async () => {
            await expect(messaggioService.inviaMessaggio(mockJson)).resolves.toBeDefined();
        });


    });
});