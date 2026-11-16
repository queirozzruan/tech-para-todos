class DomainError extends Error {
  constructor(code, message, details = []) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
  }
}

module.exports = { DomainError };
