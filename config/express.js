const express = require('express');
const session = require('express-session');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const lumie = require('lumie');

// Security
const csrf = require('csurf');
const helmet = require('helmet');

// Marko stuff
require('marko/node-require'); // Allow Node.js to require and load `.marko` files
require('path');
const markoExpress = require('marko/express');

// Mongo/session and other stuff
const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const winston = require('winston');
const helpers = require('view-helpers');
const config = require('./');
const pkg = require('../package.json');

// openapi Swagger stuff
const openapi = require('@wesleytodd/openapi');

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app, passport) {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  // Compression
  app.use(
    compression({
      threshold: 512,
    })
  );

  // Static files
  app.use(express.static(config.root + '/public'));

  // Use winston only in production
  let log;
  if (env !== 'development') {
    log = {
      stream: {
        write: (msg) => winston.info(msg),
      },
    };
  } else {
    log = 'dev';
  }

  // Don't log during tests
  if (env !== 'test') app.use(morgan(log));

  // Configure lasso to control how JS/CSS/etc. is delivered to the browser
  require('lasso').configure({
    plugins: [
      'lasso-marko', // Allow Marko templates to be compiled and transported to the browser
      {
        plugin: 'lasso-less',
        config: {
          extensions: ['less', 'css', 'less'],
          lessConfig: {
            strictMath: true,
            strictUnits: true,
          },
        },
      },
    ],
    outputDir: __dirname + '/static', // Place all generated JS/CSS/etc. files into the "static" dir
    bundlingEnabled: env !== 'development', // Only enable bundling in production
    minify: env !== 'development', // Only minify JS and CSS code in production
    fingerprintsEnabled: env !== 'development', // Only add fingerprints to URLs in production
  });

  // Allow all of the generated files under "static" to be served up by Express
  app.use(require('lasso/middleware').serveStatic());

  const markoTemplate = require(config.root + '/app/pages/index.marko');
  app.use(markoExpress()); //enable response.marko(template, data)

  app.get('/', (request, response) => {
    response.marko(markoTemplate);
  });

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(bodyParser.json());
  app.use(
    methodOverride(function (req) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );

  // cookieParser should be above session
  app.use(cookieParser());
  app.use(
    session({
      secret: pkg.name,
      proxy: true,
      resave: true,
      saveUninitialized: true,
      store: new mongoStore({
        url: config.db,
        collection: 'sessions',
      }),
    })
  );

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages - should be declared after sessions
  app.use(flash());

  // should be declared after session and flash
  app.use(helpers(pkg.name));

  // adds CSRF support
  const enableCSRF = false; // Disabling for now for seamless API use
  if (process.env.NODE_ENV !== 'test' && enableCSRF) {
    app.use(csrf());

    // This could be moved to view-helpers
    app.use(function (req, res, next) {
      res.locals.csrf_token = req.csrfToken();
      next();
    });
  }

  // API
  lumie.load(app, {
    preURL: 'api',
    verbose: true,
    ignore: ['*.spec', '*.action'],
    controllers_path: config.root + '/app/controllers',
  });

  // API Doc
  const oapi = openapi({
    openapi: '3.0.0',
    info: {
      title: 'APi Documentation',
      description: 'Flat API Documentation',
      version: '1.0.0',
    },
  });

  // This will serve the generated json document(s)
  // as well as swagger-ui or redoc
  app.use(oapi);
  app.use('/redoc', oapi.redoc);
  app.use('/swaggerui', oapi.swaggerui);
};
