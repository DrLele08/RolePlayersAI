 jest.mock("../models/utente");
jest.mock("randomstring");
jest.mock("../models/creazione");

const utente=require("../models/utente");
const utenteService = require('./utenteService');

const faker = require('@faker-js/faker').faker;

describe('utenteService', () => {
    describe('createUtente', () => {
        utente.createUtente.mockResolvedValue({
            utente: "nuovoUtente"
        });

        it('dovrebbe fallire se i dati non sono presenti', async () => {
            await expect(utenteService.createUtente(null)).rejects.toBe("Dati non validi!");
        });


        let mockJsonUsernameNotValid = {
            username: faker.lorem.words(25),
            nome: faker.person.firstName(),
            cognome: faker.lorem.word({ length: { min: 2, max: 25 }}),
            email: faker.internet.email(),
            password: "Password@1",
            dataNascita: "17-07-2002",
            telefono: "+393392801490"
        }
            it('dovrebbe fallire se il formato dello username non è valido', async () => {
            await expect(utenteService.createUtente(mockJsonUsernameNotValid)).rejects.toBe("Formato username non valido!");
        });
        let mockJsonNameNotValid = {
            username: "stefanoguida",
            nome: faker.lorem.words(25),
            cognome: faker.lorem.word({ length: { min: 2, max: 25 }}),
            email: faker.internet.email(),
            password: "Password@1",
            dataNascita: "17-07-2002",
            telefono: "+393392801490"
        }
        it('dovrebbe fallire se il formato del nome non è valido', async () => {
            await expect(utenteService.createUtente(mockJsonNameNotValid)).rejects.toBe("Formato nome non valido!");
        });
        let mockJsonSurnameNotValid = {
            username: "stefanoguida",
            nome: faker.person.firstName(),
            cognome: faker.lorem.words(25),
            email: faker.internet.email(),
            password: "Password@1",
            dataNascita: "17-07-2002",
            telefono: "+393392801490"
        }
        it('dovrebbe fallire se il formato del cognome non è valido', async () => {
            await expect(utenteService.createUtente(mockJsonSurnameNotValid)).rejects.toBe("Formato cognome non valido!");
        });
        let mockJsonEmailNotValid = {
            username: "stefanoguida",
            nome: faker.person.firstName(),
            cognome: faker.lorem.word({ length: { min: 2, max: 25 }}),
            email: "stefanoguidagmail.com",
            password: "Password@1",
            dataNascita: "17-07-2002",
            telefono: "+393392801490"
        }
        it('dovrebbe fallire se il formato email non è valido', async () => {
            await expect(utenteService.createUtente(mockJsonEmailNotValid)).rejects.toBe("Formato email non valido!");
        });
        let mockJsonPasswordNotValid = {
            username: "stefanoguida",
            nome: faker.person.firstName(),
            cognome: faker.lorem.word({ length: { min: 2, max: 25 }}),
            email: faker.internet.email(),
            password: "Password",
            dataNascita: "17-07-2002",
            telefono: "+393392801490"
        }
        it('dovrebbe fallire se il formato password non è valido', async () => {
            await expect(utenteService.createUtente(mockJsonPasswordNotValid)).rejects.toBe("Formato password non valido!");
        });
        let mockJsonDateNateNotValid = {
            username: "stefanoguida",
            nome: faker.person.firstName(),
            cognome: faker.lorem.word({ length: { min: 2, max: 25 }}),
            email: faker.internet.email(),
            password: "Password@1",
            dataNascita: "17-078-2002",
            telefono: "+393392801490"
        }
        it('dovrebbe fallire se il formato della data non è valido', async () => {
            await expect(utenteService.createUtente(mockJsonDateNateNotValid)).rejects.toBe("Formato data di nascita non valido!");
        })
        let mockJsonTelephoneNotValid = {
            username: "stefanoguida",
            nome: faker.person.firstName(),
            cognome: faker.lorem.word({ length: { min: 2, max: 25 }}),
            email: faker.internet.email(),
            password: "Password@1",
            dataNascita: "17-07-2002",
            telefono: "39390"
        }
        it('dovrebbe fallire se il formato del numero telefonico non è valido', async () => {
            await expect(utenteService.createUtente(mockJsonTelephoneNotValid)).rejects.toBe("Formato numero di telefono non valido!");
        });


        let mockJsonValid={
            username: "stefanoguida",
            nome: faker.person.firstName(),
            cognome: faker.lorem.word({ length: { min: 2, max: 25 }}),
            email: faker.internet.email(),
            password: "Password@1",
            dataNascita: "17-07-2002",
            telefono: "+393392801490"
        };
        it('Dovrebbe creare correttamente un utente ', async () => {
            await expect(utenteService.createUtente(mockJsonValid)).resolves.toBeDefined();
        });
    })
})



