const { faker } = require('@faker-js/faker');

const utilsFaker = {};

utilsFaker.generaNome = (min = 2, max = 10) => {
  let nome;
  do {
    nome = faker.person.firstName();
  } while (nome.length < min || nome.length > max);
  return nome;
};

utilsFaker.generaCognome = (min = 2, max = 10) => {
  let cognome;
  do {
    cognome = faker.person.lastName();
  } while (cognome.length < min || cognome.length > max);
  return cognome;
};

module.exports = utilsFaker;
