const { randomUUID } = require('node:crypto');

const { WorkshopStatus } = require('../enums/WorkshopStatus');
const { InvalidWorkshopError } = require('../errors/InvalidWorkshopError');
const { createWorkshopState } = require('../states/createWorkshopState');

class Workshop {
  constructor(properties) {
    const normalized = Workshop.normalize(properties);

    Workshop.validate(normalized);

    this.id = normalized.id;
    this.title = normalized.title;
    this.description = normalized.description;
    this.topic = normalized.topic;
    this.instructorName = normalized.instructorName;
    this.location = normalized.location;
    this.capacity = normalized.capacity;
    this.registrationDeadline = normalized.registrationDeadline;
    this.startsAt = normalized.startsAt;
    this.endsAt = normalized.endsAt;
    this.status = normalized.status;
    this.createdAt = normalized.createdAt;
    this.updatedAt = normalized.updatedAt;
    this.state = createWorkshopState(this.status);
  }

  static normalize(properties = {}) {
    const now = properties.createdAt ? new Date(properties.createdAt) : new Date();

    return {
      id: properties.id || randomUUID(),
      title: typeof properties.title === 'string' ? properties.title.trim() : properties.title,
      description:
        typeof properties.description === 'string'
          ? properties.description.trim()
          : properties.description,
      topic: typeof properties.topic === 'string' ? properties.topic.trim() : properties.topic,
      instructorName:
        typeof properties.instructorName === 'string'
          ? properties.instructorName.trim()
          : properties.instructorName,
      location:
        typeof properties.location === 'string' ? properties.location.trim() : properties.location,
      capacity: properties.capacity,
      registrationDeadline: Workshop.toDate(properties.registrationDeadline, 'Prazo de inscrição'),
      startsAt: Workshop.toDate(properties.startsAt, 'Data inicial'),
      endsAt: Workshop.toDate(properties.endsAt, 'Data final'),
      status: properties.status || WorkshopStatus.PLANNED,
      createdAt: now,
      updatedAt: properties.updatedAt ? new Date(properties.updatedAt) : now,
    };
  }

  static toDate(value, fieldName) {
    const date = value instanceof Date ? new Date(value) : new Date(value);

    if (Number.isNaN(date.getTime())) {
      throw new InvalidWorkshopError(`${fieldName} inválida.`);
    }

    return date;
  }

  static validate(properties) {
    Workshop.validateText(properties.title, 'Título', 3, 100);
    Workshop.validateText(properties.description, 'Descrição', 3, 1000);
    Workshop.validateText(properties.topic, 'Tema', 2, 100);
    Workshop.validateText(properties.instructorName, 'Nome do instrutor', 3, 100);
    Workshop.validateText(properties.location, 'Local', 2, 150);

    if (!Number.isInteger(properties.capacity) || properties.capacity <= 0) {
      throw new InvalidWorkshopError('A capacidade deve ser um número inteiro maior que zero.');
    }

    if (properties.endsAt <= properties.startsAt) {
      throw new InvalidWorkshopError('A data final deve ser posterior à data inicial.');
    }

    if (properties.registrationDeadline > properties.startsAt) {
      throw new InvalidWorkshopError(
        'O prazo de inscrição não pode ser posterior ao início da oficina.'
      );
    }
  }

  static validateText(value, fieldName, minimumLength, maximumLength) {
    if (typeof value !== 'string' || value.length < minimumLength || value.length > maximumLength) {
      throw new InvalidWorkshopError(
        `${fieldName} deve possuir entre ${minimumLength} e ${maximumLength} caracteres.`
      );
    }
  }

  changeStatus(nextStatus, changedAt = new Date()) {
    this.state.assertCanTransitionTo(nextStatus);
    this.state = createWorkshopState(nextStatus);
    this.status = nextStatus;
    this.updatedAt = new Date(changedAt);
  }

  canReceiveEnrollment(at = new Date()) {
    return this.state.canReceiveEnrollment(this, new Date(at));
  }

  canRecordAttendance() {
    return this.state.canRecordAttendance();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      topic: this.topic,
      instructorName: this.instructorName,
      location: this.location,
      capacity: this.capacity,
      registrationDeadline: this.registrationDeadline,
      startsAt: this.startsAt,
      endsAt: this.endsAt,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = { Workshop };
