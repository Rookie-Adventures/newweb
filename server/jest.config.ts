export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testMatch: [
    "**/__tests__/**/*.spec.ts",
    "**/?(*.)+(spec|test).ts"
  ],
  // testRegex: '**/__tests__/.*\\.spec\\.ts$', // 已被 testMatch 替代
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
