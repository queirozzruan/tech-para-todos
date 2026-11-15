function errorHandler(error, request, response, next) {
  void request;
  void next;

  console.error(error);

  return response.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ocorreu um erro interno.',
      details: [],
    },
  });
}

module.exports = { errorHandler };

