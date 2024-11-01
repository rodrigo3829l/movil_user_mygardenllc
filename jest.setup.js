// jest.setup.js

// Ignora advertencias de console.warn en las pruebas
global.console = {
  ...console,
  warn: jest.fn(), // Ignora los warnings en las pruebas
};
