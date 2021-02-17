const { login, signup, logout } = require("./auth.js");
const openapi = require("@wesleytodd/openapi");
const passport = require("passport");

const oapi = openapi({
  tags: [
    {
      name: "auth",
      description: "Operations on auth",
    },
  ],
});

const requestInvalidResponse = {
  schema: {
    type: "object",
    properties: {
      error: "string",
    },
  },
  example: {
    error: "Input request invalid",
  },
};

const loginDoc = oapi.path({
  tags: ["auth"],
  description: "Login",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
        },
        examples: {
          minimal: {
            value: {
              username: "user",
              password: "pass123",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Logged in",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: "string",
              email: "string",
              description: "string",
            },
          },
          example: {
            username: "user",
            email: "user@example.com",
            description: "A not so mysterious user",
          },
        },
      },
    },
    400: {
      description: "Request invalid",
      content: {
        "application/json": requestInvalidResponse,
      },
    },
    401: {
      description: "Credentials invalid",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: "string",
            },
          },
          example: {
            error: "Username or password invalid",
          },
        },
      },
    },
  },
});

const signupDoc = oapi.path({
  tags: ["auth"],
  description: "Signs up",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: { type: "string" },
            password: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            description: { type: "string" },
          },
        },
        examples: {
          minimal: {
            value: {
              username: "user",
              password: "pass123",
            },
          },
          extended: {
            value: {
              username: "user",
              password: "pass123",
              name: "John Doe",
              email: "user@example.com",
              description: "A not so mysterious user",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Signed up",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: "string",
              name: "string",
              email: "string",
              description: "string",
            },
          },
          example: {
            username: "user",
            name: "John doe",
            email: "user@example.com",
            description: "A not so mysterious user",
          },
        },
      },
    },
    400: {
      description: "Request invalid",
      content: {
        "application/json": requestInvalidResponse,
      },
    },
    422: {
      description: "username already exists",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: "string",
            },
          },
          example: {
            error: "username already exists",
          },
        },
      },
    },
  },
});

const logoutDoc = oapi.path({
  tags: ["auth"],
  description: "Logout",
  responses: {
    200: {
      description: "Logged out",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: "string",
            },
          },
          example: {
            message: "Logged out",
          },
        },
      },
    },
  },
});

module.exports = {
  "/login": {
    post: {
      middlewares: [loginDoc, passport.authenticate("local")],
      action: login,
      level: "public",
    },
  },
  "/signup": {
    post: {
      middlewares: signupDoc,
      action: signup,
      level: "public",
    },
  },
  "/logout": {
    get: {
      middlewares: logoutDoc,
      action: logout,
      level: "public",
    },
  },
};
