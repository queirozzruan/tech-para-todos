const { DomainError } = require('./DomainError');

class InvalidWorkshopError extends DomainError {
  constructor(message, details = []) {
    super('INVALID_WORKSHOP', message, details);
  }
}

module.exports = { InvalidWorkshopError };
