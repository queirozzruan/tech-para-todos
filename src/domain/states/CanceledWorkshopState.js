const { WorkshopStatus } = require('../enums/WorkshopStatus');
const { WorkshopState } = require('./WorkshopState');

class CanceledWorkshopState extends WorkshopState {
  constructor() {
    super(WorkshopStatus.CANCELED);
  }
}

module.exports = { CanceledWorkshopState };
