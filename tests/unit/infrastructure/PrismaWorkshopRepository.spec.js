const { Workshop } = require('../../../src/domain/entities/Workshop');
const { WorkshopStatus } = require('../../../src/domain/enums/WorkshopStatus');
const {
  PrismaWorkshopRepository,
} = require('../../../src/infrastructure/repositories/PrismaWorkshopRepository');

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
    updatedAt: '2026-11-16T10:00:00-03:00',
    ...overrides,
  });
}

function makePrismaRecord(overrides = {}) {
  return {
    ...makeWorkshop(overrides).toJSON(),
    ...overrides,
  };
}

function makePrismaMock() {
  return {
    workshop: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
}

describe('PrismaWorkshopRepository', () => {
  let prisma;
  let repository;

  beforeEach(() => {
    prisma = makePrismaMock();
    repository = new PrismaWorkshopRepository(prisma);
  });

  it('requires a Prisma client with a workshop model', () => {
    expect(() => new PrismaWorkshopRepository({})).toThrow(
      'A Prisma client with a workshop model is required.'
    );
  });

  it('creates and rehydrates a workshop', async () => {
    const workshop = makeWorkshop();
    prisma.workshop.create.mockResolvedValue(makePrismaRecord());

    const result = await repository.create(workshop);

    expect(prisma.workshop.create).toHaveBeenCalledWith({
      data: workshop.toJSON(),
    });
    expect(result).toBeInstanceOf(Workshop);
    expect(result.toJSON()).toEqual(workshop.toJSON());
  });

  it('finds a workshop by id', async () => {
    prisma.workshop.findUnique.mockResolvedValue(makePrismaRecord());

    const result = await repository.findById('workshop-id');

    expect(prisma.workshop.findUnique).toHaveBeenCalledWith({
      where: { id: 'workshop-id' },
    });
    expect(result).toBeInstanceOf(Workshop);
  });

  it('returns null when a workshop is not found', async () => {
    prisma.workshop.findUnique.mockResolvedValue(null);

    await expect(repository.findById('missing-id')).resolves.toBeNull();
  });

  it('lists workshops using the supported filters', async () => {
    prisma.workshop.findMany.mockResolvedValue([makePrismaRecord()]);

    const result = await repository.findAll({
      status: WorkshopStatus.PLANNED,
      topic: 'JavaScript',
      from: '2026-11-01T00:00:00-03:00',
      to: '2026-11-30T23:59:59-03:00',
    });

    expect(prisma.workshop.findMany).toHaveBeenCalledWith({
      where: {
        status: WorkshopStatus.PLANNED,
        topic: { contains: 'JavaScript' },
        startsAt: {
          gte: new Date('2026-11-01T00:00:00-03:00'),
          lte: new Date('2026-11-30T23:59:59-03:00'),
        },
      },
      orderBy: { startsAt: 'asc' },
    });
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(Workshop);
  });

  it('updates mutable workshop data without replacing identity or creation date', async () => {
    const workshop = makeWorkshop({ status: WorkshopStatus.REGISTRATION_OPEN });
    prisma.workshop.update.mockResolvedValue(
      makePrismaRecord({
        status: WorkshopStatus.REGISTRATION_OPEN,
      })
    );

    await repository.update(workshop);

    const persistence = workshop.toJSON();
    const { id, createdAt, ...expectedData } = persistence;
    expect(prisma.workshop.update).toHaveBeenCalledWith({
      where: { id },
      data: expectedData,
    });
    expect(createdAt).toEqual(workshop.createdAt);
  });

  it('deletes and returns the removed workshop', async () => {
    prisma.workshop.delete.mockResolvedValue(makePrismaRecord());

    const result = await repository.delete('workshop-id');

    expect(prisma.workshop.delete).toHaveBeenCalledWith({
      where: { id: 'workshop-id' },
    });
    expect(result).toBeInstanceOf(Workshop);
  });
});
