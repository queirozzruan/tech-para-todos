const { WorkshopStatus } = require('../enums/WorkshopStatus');
const { WorkshopState } = require('./WorkshopState');

class RegistrationOpenWorkshopState extends WorkshopState {
  constructor() {
    super(WorkshopStatus.REGISTRATION_OPEN, [WorkshopStatus.IN_PROGRESS, WorkshopStatus.CANCELED]);
  }

  canReceiveEnrollment(workshop, at) {
    return at <= workshop.registrationDeadline && at < workshop.startsAt;
  }
}

module.exports = { RegistrationOpenWorkshopState };
