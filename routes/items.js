const items = require("../items.js");

//item schema
const item = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
  },
};

// options for get all items
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: item,
      },
    },
  },
  handler: function (req, reply) {
    reply.send(items);
  },
};

const getItemOpts = {
  schema: {
    response: {
      200: item,
    },
  },
  handler: function (req, reply) {
    const id = req.params.id;
    const item = items.find((item) => item.id === id);
    if (item) {
      reply.send(item);
    } else {
      reply.send({
        msg: "No item found",
      });
    }
  },
};

function itemRoutes(fastify, options, done) {
  fastify.get("/", (req, reply) => {
    reply.send({ msg: "hello fastify" });
  });

  // get all items
  fastify.get("/items", getItemsOpts);
  // demo post route
  fastify.post("/", (req, reply) => {
    reply.send(req.body);
  });
  // get single item
  fastify.get("/items/:id", getItemOpts);
  done();
}

module.exports = itemRoutes;
