export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '**/*.{js,tsx}'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
