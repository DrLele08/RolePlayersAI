jest.mock('../models/creazione');

const { faker } = require('@faker-js/faker');
const creazioneService = require('./creazioneService');
const creazione = require('../models/creazione');

const ID_UTENTE_MIN = 1;
const ID_UTENTE_MAX = 100;
const NOME_MIN_LENGTH = 1;
const NOME_MAX_LENGTH = 50;
const DESCRIZIONE_MIN_LENGTH = 1;
const DESCRIZIONE_MAX_LENGTH = 512;
const ISPUBBLICO_OPTIONS = [0, 1];
const TIPO_OPTIONS = ['ambiente', 'personaggio'];
const SESSO_OPTIONS = ['uomo', 'donna', 'altro'];
describe('creazioneService', () => {
  describe('createCreazione', () => {
    creazione.createPersonaggio.mockImplementation(async () => ({}));

    creazione.createAmbiente.mockImplementation(async () => ({}));

    // dati == null
    it('dovrebbe fallire se i dati non sono presenti', async () => {
      await expect(creazioneService.createCreazione(null)).rejects.toBe('Dati non validi');
    });

    // manca fkUtente
    const mockJson1 = {
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: faker.helpers.arrayElement(TIPO_OPTIONS),
    };

    it('dovrebbe fallire se tra i dati manca fkUtente', async () => {
      await expect(creazioneService.createCreazione(mockJson1)).rejects.toBe('Dati non validi');
    });

    // manca nome
    const mockJson2 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: faker.helpers.arrayElement(TIPO_OPTIONS),
    };

    it('dovrebbe fallire se tra i dati manca nome', async () => {
      await expect(creazioneService.createCreazione(mockJson2)).rejects.toBe('Dati non validi');
    });

    // manca descrizione
    const mockJson3 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: faker.helpers.arrayElement(TIPO_OPTIONS),
    };

    it('dovrebbe fallire se tra i dati manca descrizione', async () => {
      await expect(creazioneService.createCreazione(mockJson3)).rejects.toBe('Dati non validi');
    });

    // manca isPubblico
    const mockJson4 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      tipo: faker.helpers.arrayElement(TIPO_OPTIONS),
    };

    it('dovrebbe fallire se tra i dati manca isPubblico', async () => {
      await expect(creazioneService.createCreazione(mockJson4)).rejects.toBe('Dati non validi');
    });

    // manca tipo
    const mockJson5 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
    };

    it('dovrebbe fallire se tra i dati manca tipo', async () => {
      await expect(creazioneService.createCreazione(mockJson5)).rejects.toBe('Dati non validi');
    });

    // fkUtente non valido
    const mockJson6 = {
      fkUtente: -1,
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: faker.helpers.arrayElement(TIPO_OPTIONS),
    };

    it('dovrebbe fallire se fkUtente non è valido', async () => {
      await expect(creazioneService.createCreazione(mockJson6)).rejects.toBe('ID utente non valido');
    });

    // nome troppo corto (< 1)
    const mockJson7 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        max: NOME_MIN_LENGTH - 1,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: faker.helpers.arrayElement(TIPO_OPTIONS),
    };

    it(`dovrebbe fallire se la lunghezza del nome è < ${NOME_MIN_LENGTH}`, async () => {
      await expect(creazioneService.createCreazione(mockJson7)).rejects.toBe('Nome troppo corto');
    });

    // nome troppo lungo (> 50)
    const mockJson8 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MAX_LENGTH - 1,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: faker.helpers.arrayElement(TIPO_OPTIONS),
    };

    it(`dovrebbe fallire se la lunghezza del nome è > ${NOME_MAX_LENGTH}`, async () => {
      await expect(creazioneService.createCreazione(mockJson8)).rejects.toBe('Nome troppo lungo');
    });

    // descrizione troppo corta (< 1)
    const mockJson9 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        max: DESCRIZIONE_MIN_LENGTH - 1,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: faker.helpers.arrayElement(TIPO_OPTIONS),
    };

    it(`dovrebbe fallire se la lunghezza della descrizione è < ${DESCRIZIONE_MIN_LENGTH}`, async () => {
      await expect(creazioneService.createCreazione(mockJson9)).rejects.toBe('Descrizione troppo corta');
    });

    // descrizione troppo lunga (> 512)
    const mockJson10 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MAX_LENGTH - 1,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: faker.helpers.arrayElement(TIPO_OPTIONS),
    };

    it(`dovrebbe fallire se la lunghezza della descrizione è > ${DESCRIZIONE_MAX_LENGTH}`, async () => {
      await expect(creazioneService.createCreazione(mockJson10)).rejects.toBe('Descrizione troppo lunga');
    });

    // isPubblico NaN
    const mockJson11 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.lorem.word(),
      tipo: faker.helpers.arrayElement(TIPO_OPTIONS),
    };

    it('dovrebbe fallire se isPubblico non è un valore numerico', async () => {
      await expect(creazioneService.createCreazione(mockJson11)).rejects.toBe('Il valore di isPubblico deve essere numerico');
    });

    // isPubblico diverso da 1 e da 0
    const mockJson12 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.number.int({
        min: 2,
        max: 100,
      }),
      tipo: faker.helpers.arrayElement(TIPO_OPTIONS),
    };

    it('dovrebbe fallire se isPubblico non è un valore binario', async () => {
      await expect(creazioneService.createCreazione(mockJson12)).rejects.toBe('Valore di isPubblico non ammesso');
    });

    // tipo diverso da 'Ambiente' e da 'Personaggio'
    const mockJson13 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: faker.lorem.word(),
    };

    it('dovrebbe fallire se il tipo specificato non è valido', async () => {
      await expect(creazioneService.createCreazione(mockJson13)).rejects.toBe('Tipo non valido');
    });

    // tipo uguale a 'Personaggio' e sesso non presente
    const mockJson14 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: 'personaggio',
    };

    it('dovrebbe fallire se il tipo è \'personaggio\' e il sesso non è specificato', async () => {
      await expect(creazioneService.createCreazione(mockJson14)).rejects.toBe('Sesso non specificato');
    });

    // sesso diverso da 'Uomo' 'Donna' e 'Altro'
    const mockJson15 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: 'personaggio',
      sesso: faker.lorem.word(),
    };

    it('dovrebbe fallire se il tipo è \'personaggio\' e il sesso specificato non è valido', async () => {
      await expect(creazioneService.createCreazione(mockJson15)).rejects.toBe('Sesso non valido');
    });

    // creazione personaggio
    const mockJson16 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: 'personaggio',
      sesso: faker.helpers.arrayElement(SESSO_OPTIONS),
    };

    it('dovrebbe creare correttamente un personaggio', async () => {
      await expect(creazioneService.createCreazione(mockJson16)).resolves.toBeDefined();
    });

    // creazione ambiente
    const mockJson17 = {
      fkUtente: faker.number.int({
        min: ID_UTENTE_MIN,
        max: ID_UTENTE_MAX,
      }),
      nome: words({
        min: NOME_MIN_LENGTH,
        max: NOME_MAX_LENGTH,
      }),
      descrizione: words({
        min: DESCRIZIONE_MIN_LENGTH,
        max: DESCRIZIONE_MAX_LENGTH,
      }),
      isPubblico: faker.helpers.arrayElement(ISPUBBLICO_OPTIONS),
      tipo: 'ambiente',
    };

    it('dovrebbe creare correttamente un ambiente', async () => {
      await expect(creazioneService.createCreazione(mockJson17)).resolves.toBeDefined();
    });
  });
});

function words({ min = 0, max = 1000 }) {
  if (isNaN(min) || isNaN(max) || min > max) {
    return null;
  }

  const target = Math.floor(Math.random() * (max - min + 1)) + min;

  return faker.lorem.words(max).slice(0, target);
}
