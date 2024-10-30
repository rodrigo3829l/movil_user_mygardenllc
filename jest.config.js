export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'ts', 'vue'],
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.(js|ts)$': 'ts-jest'
    },
    transformIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: [
      '<rootDir>/tests/unit/**/*.spec.(js|ts)'
    ],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,vue,ts}',
      '!src/main.ts', // Excluir archivos de entrada principales
      '!src/router/**', // Excluir la configuración del router
      '!src/types/**', // Excluir tipos
      '!**/node_modules/**'
    ],
  };
  