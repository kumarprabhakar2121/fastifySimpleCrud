const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("./routes/items"));

const port = 5000;

const start = async () => {
  try {
    await fastify.listen(port);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
