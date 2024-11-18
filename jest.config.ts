import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: './tsconfig.app.json' }],
  },
  moduleNameMapper: {
    // Si usas tsconfig.paths, ayuda mapearlos aquí también
    '@components/(.*)$': '<rootDir>/src/components/$1',
    '@/(.*)$': '<rootDir>/src/$1',

    // Mock de assets y estilos
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/mocks/fileMock.ts',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/tests/mocks/styleMock.ts',

    // Mock de modelos y servicios
    '(assets|models|services)': '<rootDir>/tests/mocks/fileMock.ts',
  },
  setupFilesAfterEnv: ['./tests/setupTests.ts'], // Configuración de matchers adicionales
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jsdom', // Ambiente de prueba
};

export default config;
