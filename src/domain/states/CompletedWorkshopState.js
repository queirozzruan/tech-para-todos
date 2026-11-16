const { WorkshopStatus } = require('../enums/WorkshopStatus');
const { WorkshopState } = require('./WorkshopState');

class CompletedWorkshopState extends WorkshopState {
  constructor() {
    super(WorkshopStatus.COMPLETED);
  }

  canRecordAttendance() {
    return true;
  }
}

module.exports = { CompletedWorkshopState };
