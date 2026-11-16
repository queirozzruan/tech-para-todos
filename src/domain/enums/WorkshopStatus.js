const WorkshopStatus = Object.freeze({
  PLANNED: 'PLANNED',
  REGISTRATION_OPEN: 'REGISTRATION_OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
});

const WORKSHOP_STATUSES = Object.freeze(Object.values(WorkshopStatus));

module.exports = { WorkshopStatus, WORKSHOP_STATUSES };
