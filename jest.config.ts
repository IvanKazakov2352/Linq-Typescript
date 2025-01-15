import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ['src'],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  modulePaths: [
    '<rootDir>/src'
  ],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json', diagnostics: false }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['/node_modules/'],
  verbose: true,
  silent: false,
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;
