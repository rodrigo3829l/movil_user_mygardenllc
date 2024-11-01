module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.vue$": "@vue/vue3-jest",
        "^.+\\.[tj]sx?$": "babel-jest",
    },
    transformIgnorePatterns: ["/node_modules/(?!@ionic/vue)"],
    moduleFileExtensions: ["vue", "js", "ts", "json"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    setupFiles: ["<rootDir>/__mocks__/ionicVueMock.js"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
    coverageReporters: ["text", "json-summary"],
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
};