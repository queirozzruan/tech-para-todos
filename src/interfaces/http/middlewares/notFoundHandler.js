function notFoundHandler(request, response) {
  return response.status(404).json({
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'Rota não encontrada.',
      details: [],
    },
  });
}

module.exports = { notFoundHandler };
