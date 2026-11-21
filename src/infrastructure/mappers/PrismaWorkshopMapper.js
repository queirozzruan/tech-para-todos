const { Workshop } = require('../../domain/entities/Workshop');

class PrismaWorkshopMapper {
  static toDomain(record) {
    if (!record) {
      return null;
    }

    return new Workshop({
      id: record.id,
      title: record.title,
      description: record.description,
      topic: record.topic,
      instructorName: record.instructorName,
      location: record.location,
      capacity: record.capacity,
      registrationDeadline: record.registrationDeadline,
      startsAt: record.startsAt,
      endsAt: record.endsAt,
      status: record.status,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  static toPersistence(workshop) {
    return workshop.toJSON();
  }
}

module.exports = { PrismaWorkshopMapper };
