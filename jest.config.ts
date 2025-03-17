import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>'],
    testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    moduleNameMapper: {
        "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.ts",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "@fontsource/manrope": "<rootDir>/__mocks__/styleMock.ts"
    },
};

export default config;