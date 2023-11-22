//global.fetch = require('jest-mock-fetch');
import 'jest-fetch-mock'

global.console={
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn()
}

