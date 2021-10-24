import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'jest-expo',
  setupFilesAfterEnv: ['./src/__tests__/setupTests.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)'
  ],
  collectCoverage: false,
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/coverage/**', '!**/node_modules/**', '!**/babel.config.js', '!**/jest.setup.js']
};

export default config;
