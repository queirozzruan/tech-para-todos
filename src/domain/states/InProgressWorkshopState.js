const { WorkshopStatus } = require('../enums/WorkshopStatus');
const { WorkshopState } = require('./WorkshopState');

class InProgressWorkshopState extends WorkshopState {
  constructor() {
    super(WorkshopStatus.IN_PROGRESS, [WorkshopStatus.COMPLETED, WorkshopStatus.CANCELED]);
  }

  canRecordAttendance() {
    return true;
  }
}

module.exports = { InProgressWorkshopState };
