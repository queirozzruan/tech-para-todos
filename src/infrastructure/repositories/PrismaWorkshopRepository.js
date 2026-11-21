const { WorkshopRepository } = require('../../application/ports/WorkshopRepository');
const { PrismaWorkshopMapper } = require('../mappers/PrismaWorkshopMapper');

class PrismaWorkshopRepository extends WorkshopRepository {
  constructor(prisma) {
    super();

    if (!prisma?.workshop) {
      throw new TypeError('A Prisma client with a workshop model is required.');
    }

    this.prisma = prisma;
  }

  async create(workshop) {
    const record = await this.prisma.workshop.create({
      data: PrismaWorkshopMapper.toPersistence(workshop),
    });

    return PrismaWorkshopMapper.toDomain(record);
  }

  async findById(id) {
    const record = await this.prisma.workshop.findUnique({
      where: { id },
    });

    return PrismaWorkshopMapper.toDomain(record);
  }

  async findAll(filters = {}) {
    const where = this.buildWhere(filters);
    const records = await this.prisma.workshop.findMany({
      where,
      orderBy: { startsAt: 'asc' },
    });

    return records.map((record) => PrismaWorkshopMapper.toDomain(record));
  }

  async update(workshop) {
    const persistedWorkshop = PrismaWorkshopMapper.toPersistence(workshop);
    const { id } = persistedWorkshop;
    const data = { ...persistedWorkshop };
    delete data.id;
    delete data.createdAt;

    const record = await this.prisma.workshop.update({
      where: { id },
      data,
    });

    return PrismaWorkshopMapper.toDomain(record);
  }

  async delete(id) {
    const record = await this.prisma.workshop.delete({
      where: { id },
    });

    return PrismaWorkshopMapper.toDomain(record);
  }

  buildWhere({ status, topic, from, to }) {
    return {
      ...(status && { status }),
      ...(topic && { topic: { contains: topic } }),
      ...((from || to) && {
        startsAt: {
          ...(from && { gte: new Date(from) }),
          ...(to && { lte: new Date(to) }),
        },
      }),
    };
  }
}

module.exports = { PrismaWorkshopRepository };
