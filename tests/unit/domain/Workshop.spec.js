const { Workshop } = require('../../../src/domain/entities/Workshop');
const { WorkshopStatus } = require('../../../src/domain/enums/WorkshopStatus');
const { InvalidWorkshopError } = require('../../../src/domain/errors/InvalidWorkshopError');
const {
  InvalidWorkshopStatusTransitionError,
} = require('../../../src/domain/errors/InvalidWorkshopStatusTransitionError');

function makeWorkshop(overrides = {}) {
  return new Workshop({
    id: 'workshop-id',
    title: 'Introdução ao JavaScript',
    description: 'Oficina gratuita de programação para iniciantes.',
    topic: 'Programação',
    instructorName: 'Equipe TechParaTodos',
    location: 'Sala comunitária',
    capacity: 20,
    registrationDeadline: '2026-11-27T23:59:59-03:00',
    startsAt: '2026-11-28T14:00:00-03:00',
    endsAt: '2026-11-28T16:00:00-03:00',
    createdAt: '2026-11-16T10:00:00-03:00',
    ...overrides,
  });
}

describe('Workshop', () => {
  it('creates a planned workshop with normalized text', () => {
    const workshop = makeWorkshop({ title: '  Introdução ao JavaScript  ' });

    expect(workshop.id).toBe('workshop-id');
    expect(workshop.title).toBe('Introdução ao JavaScript');
    expect(workshop.status).toBe(WorkshopStatus.PLANNED);
  });

  it('rejects a non-positive capacity', () => {
    expect(() => makeWorkshop({ capacity: 0 })).toThrow(InvalidWorkshopError);
  });

  it('rejects an end date that is not after the start date', () => {
    expect(() =>
      makeWorkshop({
        endsAt: '2026-11-28T13:00:00-03:00',
      })
    ).toThrow('A data final deve ser posterior à data inicial.');
  });

  it('rejects a registration deadline after the workshop starts', () => {
    expect(() =>
      makeWorkshop({
        registrationDeadline: '2026-11-28T15:00:00-03:00',
      })
    ).toThrow('O prazo de inscrição não pode ser posterior ao início da oficina.');
  });

  it('follows the valid workshop status flow', () => {
    const workshop = makeWorkshop();

    workshop.changeStatus(WorkshopStatus.REGISTRATION_OPEN);
    workshop.changeStatus(WorkshopStatus.IN_PROGRESS);
    workshop.changeStatus(WorkshopStatus.COMPLETED);

    expect(workshop.status).toBe(WorkshopStatus.COMPLETED);
  });

  it('rejects an invalid status transition', () => {
    const workshop = makeWorkshop();

    expect(() => workshop.changeStatus(WorkshopStatus.COMPLETED)).toThrow(
      InvalidWorkshopStatusTransitionError
    );
  });

  it('receives enrollment only while registration is open and before the deadline', () => {
    const workshop = makeWorkshop();

    workshop.changeStatus(WorkshopStatus.REGISTRATION_OPEN);

    expect(workshop.canReceiveEnrollment('2026-11-27T12:00:00-03:00')).toBe(true);
    expect(workshop.canReceiveEnrollment('2026-11-28T00:00:00-03:00')).toBe(false);
  });

  it('records attendance only while in progress or completed', () => {
    const workshop = makeWorkshop();

    expect(workshop.canRecordAttendance()).toBe(false);

    workshop.changeStatus(WorkshopStatus.REGISTRATION_OPEN);
    workshop.changeStatus(WorkshopStatus.IN_PROGRESS);
    expect(workshop.canRecordAttendance()).toBe(true);

    workshop.changeStatus(WorkshopStatus.COMPLETED);
    expect(workshop.canRecordAttendance()).toBe(true);
  });

  it('allows cancellation before completion', () => {
    const workshop = makeWorkshop();

    workshop.changeStatus(WorkshopStatus.CANCELED);

    expect(workshop.status).toBe(WorkshopStatus.CANCELED);
    expect(() => workshop.changeStatus(WorkshopStatus.REGISTRATION_OPEN)).toThrow(
      InvalidWorkshopStatusTransitionError
    );
  });
});
