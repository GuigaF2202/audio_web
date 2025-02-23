export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  globals: {
    'babel-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  
  // Novas configurações adicionadas
  globalSetup: '<rootDir>/tests/jest.setup.js',
  globalTeardown: '<rootDir>/tests/jest.teardown.js',
  testTimeout: 30000,
  detectOpenHandles: true,
  
  // Configurações existentes melhoradas
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text-summary', 'lcov'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/src/config/'
  ],
  
  testPathIgnorePatterns: ['/node_modules/'],
  verbose: true,

  // Extras para TypeScript (opcional)
  preset: 'ts-jest/presets/js-with-ts-esm',
  transformIgnorePatterns: [
    '/node_modules/(?!(lodash-es|@supabase/.*))'
  ]
};
