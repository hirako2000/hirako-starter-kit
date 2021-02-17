const template404 = require("../app/pages/404/index.marko");
const template500 = require("../app/pages/500/index.marko");

/**
 *  Catches 4/5xx errors
 */
module.exports = function (app) {
  /**
   * Error handling
   */
  app.use(function (err, req, res, next) {
    if (
      err.message &&
      (~err.message.indexOf("not found") ||
        ~err.message.indexOf("Cast to ObjectId failed"))
    ) {
      return next();
    }
    // error page
    res.marko(template500);
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    res.marko(template404);
  });
};
