const createSuccessResponse = (res: any, message: any, data?: any) => {
  return res.status(200).send({
    status: 'OK',
    message: message || 'Success',
    timestamp: new Date(),
    data: data,
  });
};

const createErrorResponse = (res: any, message: any, statusCode?: any) => {
  console.error(message);
  return res.status(statusCode ?? 500).send({
    status: 'Internal Server Error',
    message: message || 'Error',
    timestamp: new Date(),
    errorSource: 'Client_360',
  });
};

export { createSuccessResponse, createErrorResponse };
