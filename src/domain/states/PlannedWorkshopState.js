const { WorkshopStatus } = require('../enums/WorkshopStatus');
const { WorkshopState } = require('./WorkshopState');

class PlannedWorkshopState extends WorkshopState {
  constructor() {
    super(WorkshopStatus.PLANNED, [WorkshopStatus.REGISTRATION_OPEN, WorkshopStatus.CANCELED]);
  }
}

module.exports = { PlannedWorkshopState };
