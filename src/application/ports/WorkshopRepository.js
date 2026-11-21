class WorkshopRepository {
  async create() {
    throw new Error('WorkshopRepository.create must be implemented.');
  }

  async findById() {
    throw new Error('WorkshopRepository.findById must be implemented.');
  }

  async findAll() {
    throw new Error('WorkshopRepository.findAll must be implemented.');
  }

  async update() {
    throw new Error('WorkshopRepository.update must be implemented.');
  }

  async delete() {
    throw new Error('WorkshopRepository.delete must be implemented.');
  }
}

module.exports = { WorkshopRepository };
