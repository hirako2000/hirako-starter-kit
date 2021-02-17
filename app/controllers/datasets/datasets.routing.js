const { create, getOne, getAll } = require("./datasets.js");
const openapi = require("@wesleytodd/openapi");

const oapi = openapi({
  tags: [
    {
      name: "datasets",
      description: "Operations on datasets",
    },
  ],
});

const getOneDoc = oapi.path({
  tags: ["datasets"],
  description: "Get a single dataset",
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              dataset: { type: "Object" },
            },
          },
        },
      },
    },
    404: {
      description: "Dataset not found, you may not have access to it",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
        },
      },
    },
  },
});

const getAllDocs = oapi.path({
  tags: ["datasets"],
  description: "Get all datasets",
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              datasets: { type: "array" },
            },
          },
        },
      },
    },
  },
});

module.exports = {
  "/": {
    post: {
      action: create,
      level: "public",
    },
    get: {
      middlewares: getAllDocs,
      action: getAll,
      level: "public",
    },
  },
  "/:id": {
    get: {
      middlewares: getOneDoc,
      action: getOne,
      level: "public",
    },
  },
};
