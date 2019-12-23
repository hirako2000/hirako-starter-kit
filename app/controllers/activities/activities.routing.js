const { create, getOne, getAll } = require('./activities.js');
const openapi = require('@wesleytodd/openapi');

const oapi = openapi({
  tags: [
    {
      name: 'activities',
      description: 'Operations on activities'
    }
  ]
});

const getOneDoc = oapi.path({
  tags: ['activities'],
  description: 'Get a single activity',
  responses: {
    '200': {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              dataset: { type: 'Object' }
            }
          }
        }
      }
    },
    '404': {
      description: 'Activity not found, you may not have access to it',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: { type: 'string' }
            }
          }
        }
      }
    }
  }
});

const getAllDocs = oapi.path({
  tags: ['activities'],
  description: 'Get all activities',
  responses: {
    '200': {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              datasets: { type: 'array' }
            }
          }
        }
      }
    }
  }
});

module.exports = {
  '/': {
    post: {
      action: create,
      level: 'public'
    },
    get: {
      middlewares: getAllDocs,
      action: getAll,
      level: 'public'
    }
  },
  '/:id': {
    get: {
      middlewares: getOneDoc,
      action: getOne,
      level: 'public'
    }
  }
};
