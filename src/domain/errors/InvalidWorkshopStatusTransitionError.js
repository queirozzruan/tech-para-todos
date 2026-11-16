const { DomainError } = require('./DomainError');

class InvalidWorkshopStatusTransitionError extends DomainError {
  constructor(currentStatus, nextStatus) {
    super(
      'INVALID_WORKSHOP_STATUS_TRANSITION',
      `Não é possível alterar o status da oficina de ${currentStatus} para ${nextStatus}.`
    );
  }
}

module.exports = { InvalidWorkshopStatusTransitionError };
