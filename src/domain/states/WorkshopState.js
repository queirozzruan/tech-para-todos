const {
  InvalidWorkshopStatusTransitionError,
} = require('../errors/InvalidWorkshopStatusTransitionError');

class WorkshopState {
  constructor(status, allowedTransitions = []) {
    this.status = status;
    this.allowedTransitions = new Set(allowedTransitions);
  }

  assertCanTransitionTo(nextStatus) {
    if (!this.allowedTransitions.has(nextStatus)) {
      throw new InvalidWorkshopStatusTransitionError(this.status, nextStatus);
    }
  }

  canReceiveEnrollment() {
    return false;
  }

  canRecordAttendance() {
    return false;
  }
}

module.exports = { WorkshopState };
