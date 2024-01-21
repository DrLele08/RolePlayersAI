// Assuming you have Jest installed, if not, install it by running: npm install --save-dev jest

const inventarioService = require('./path-to-your-inventario-service-file');
const utente = require('./path-to-your-utente-file'); // Import the utente module

jest.mock('./path-to-your-utente-file'); // Mock the utente module

describe('inventarioService.addContenuto', () => {
    test('should reject when both idCreazione and idContesto are missing or provided together', async () => {
        const data = { idUtente: 1 }; // Adjust the data object accordingly

        await expect(inventarioService.addContenuto(data)).rejects.toEqual("Devi fornire uno tra idCreazione e idContesto!");
    });

    test('should reject when user does not have permission', async () => {
        const data = { idUtente: 1, idCreazione: 2 }; // Adjust the data object accordingly

        utente.getById.mockResolvedValue({}); // Mocking the result of utente.getById

        await expect(inventarioService.addContenuto(data)).rejects.toEqual("Non hai i permessi!");
    });

    test('should reject when Creazione/Contesto already present in Inventario', async () => {
        const data = { idUtente: 1, idCreazione: 2 }; // Adjust the data object accordingly

        utente.getById.mockResolvedValue({}); // Mocking the result of utente.getById
        utente.hasCreazione.mockResolvedValue(true); // Mocking the result of utente.hasCreazione

        await expect(inventarioService.addContenuto(data)).rejects.toEqual("Creazione già presente nell'Inventario!");
    });

    // Add more test cases as needed to cover different scenarios

    // Ensure to test both idCreazione and idContesto branches separately
});
