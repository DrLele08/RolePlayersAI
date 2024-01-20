jest.mock('../models/sessione');
jest.mock('../models/utente');
jest.mock('../models/contesto');
jest.mock('./conversazioneService');

const { faker } = require('@faker-js/faker');
const sessione = require('../models/sessione');
const sessioneService = require('./sessioneService');
const utente = require('../models/utente');
const contesto = require('../models/contesto');

describe('sessioneService', () => {
  describe('createSessione', () => {
    sessione.createSessione.mockResolvedValue({
      sessione: 'nuovaSessione',
    });

    it('dovrebbe fallire se i dati non sono presenti', async () => {
      await expect(sessioneService.createSessione(null)).rejects.toBe('Dati non validi!');
    });

    utente.getById.mockImplementation(async () => ({
      idUtente: 1,
    }));

    contesto.getContestoById.mockImplementation(async () => ({
      idContesto: 1,
    }));

    sessione.createSessione.mockImplementation(() => Promise.resolve({
      idSessione: 1,
      getContesto: jest.fn().mockImplementation(() => Promise.resolve({
        getCreaziones: jest.fn().mockResolvedValue([]),
      })),
    }));

    const mockJsonIdUtenteNotValid = {
      idUtente: -1,
      idContesto: faker.number.int({ min: 1 }),
      titolo: faker.lorem.word({ length: { min: 1, max: 255 } }),
    };
    it('Dovrebbe fallire se IdUtente non è valido', async () => {
      await expect(sessioneService.createSessione(mockJsonIdUtenteNotValid)).rejects.toBe('ID utente non valido!');
    });

    const mockJsonIdContestoNotValid = {
      idUtente: faker.number.int({ min: 1 }),
      idContesto: -1,
      titolo: faker.lorem.word({ length: { min: 1, max: 255 } }),
    };
    it('Dovrebbe fallire se IdContesto non è valido', async () => {
      await expect(sessioneService.createSessione(mockJsonIdContestoNotValid)).rejects.toBe('ID contesto non valido!');
    });

    const mockJsonIdUtenteNull = {
      idContesto: 1,
      titolo: faker.lorem.word({ length: { min: 1, max: 255 } }),
    };
    it('Dovrebbe fallire se fra i dati manca idUtente', async () => {
      await expect(sessioneService.createSessione(mockJsonIdUtenteNull)).rejects.toBe('Dati non validi!');
    });

    const mockJsonIdContestoNull = {
      idUtente: 1,
      titolo: faker.lorem.word({ length: { min: 1, max: 255 } }),
    };
    it('Dovrebbe fallire se fra i dati manca idContesto', async () => {
      await expect(sessioneService.createSessione(mockJsonIdContestoNull)).rejects.toBe('Dati non validi!');
    });

    const mockJsonTitleNotValid = {
      idUtente: 1,
      idContesto: 1,
      titolo: faker.lorem.words(255),
    };
    it('Dovrebbe fallire se il formato del titolo non è valido', async () => {
      await expect(sessioneService.createSessione(mockJsonTitleNotValid)).rejects.toBe('Titolo non valido! Deve essere una stringa alfanumerica di massimo 255 caratteri.');
    });

    const mockJsonValid = {
      idUtente: faker.number.int({ min: 1 }),
      idContesto: faker.number.int({ min: 1 }),
      titolo: faker.lorem.word({ length: { min: 1, max: 255 } }),
    };
    it('Dovrebbe creare correttamente una sessione', async () => {
      await expect(sessioneService.createSessione(mockJsonValid)).resolves.toBeDefined();
    });
  });
});
