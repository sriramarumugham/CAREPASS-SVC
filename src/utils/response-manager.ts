const responseManager = (response: any, reply: any) => {
  switch (true) {
    case response.matchedCount === 0:
      reply.status(400).send({
        status: 'failed',
        message: 'id not found',
        timestamp: new Date(),
      });
      break;
    case !response.acknowledged:
      reply.status(500).send({
        status: 'failed',
        message: 'something went wrong!',
        timestamp: new Date(),
      });
      break;

    case response.modifiedCount === 0:
      reply.status(400).send({
        status: 'failed',
        message: `nothing was modified`,
        timestamp: new Date(),
      });
      break;

    default:
      // nothing matches return response
      return true;
  }
};

export { responseManager };
