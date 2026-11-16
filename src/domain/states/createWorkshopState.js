const { WorkshopStatus } = require('../enums/WorkshopStatus');
const { InvalidWorkshopError } = require('../errors/InvalidWorkshopError');
const { CanceledWorkshopState } = require('./CanceledWorkshopState');
const { CompletedWorkshopState } = require('./CompletedWorkshopState');
const { InProgressWorkshopState } = require('./InProgressWorkshopState');
const { PlannedWorkshopState } = require('./PlannedWorkshopState');
const { RegistrationOpenWorkshopState } = require('./RegistrationOpenWorkshopState');

function createWorkshopState(status) {
  const states = {
    [WorkshopStatus.PLANNED]: () => new PlannedWorkshopState(),
    [WorkshopStatus.REGISTRATION_OPEN]: () => new RegistrationOpenWorkshopState(),
    [WorkshopStatus.IN_PROGRESS]: () => new InProgressWorkshopState(),
    [WorkshopStatus.COMPLETED]: () => new CompletedWorkshopState(),
    [WorkshopStatus.CANCELED]: () => new CanceledWorkshopState(),
  };

  const createState = states[status];

  if (!createState) {
    throw new InvalidWorkshopError(`Status de oficina inválido: ${status}.`);
  }

  return createState();
}

module.exports = { createWorkshopState };
