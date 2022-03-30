const {
  getItem,
  getItems,
  addItem,
  deleteItem,
  updateItem,
} = require("../controllers/items");

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
  handler: getItems,
};

const getItemOpts = {
  schema: {
    response: {
      200: item,
    },
  },
  handler: getItem,
};

const updateItemOpts = {
  schema: {
    response: {
      200: item,
    },
  },
  handler: updateItem,
};

const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: deleteItem,
};

const postItemsOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      201: item,
    },
  },
  handler: addItem,
};

function itemRoutes(fastify, options, done) {
  // get all items
  fastify.get("/items", getItemsOpts);

  // add item
  fastify.post("/items", postItemsOpts);

  // get single item
  fastify.get("/items/:id", getItemOpts);

  // delete item
  fastify.delete("/items/:id", deleteItemOpts);

  // update item
  fastify.put("/items/:id", updateItemOpts);

  done();
}

module.exports = itemRoutes;
