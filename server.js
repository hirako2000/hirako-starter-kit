"use strict";
require("dotenv").config();

const fs = require("fs");
const join = require("path").join;
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config");

const models = join(__dirname, "app/models");
const port = process.env.PORT || 3000;

const app = express();
const connection = connect();
let server = null;

module.exports = {
  app,
  connection,
  close,
};

// Bootstrap models
fs.readdirSync(models)
  .filter((file) => ~file.indexOf(".js"))
  .forEach((file) => require(join(models, file)));

// Bootstrap routes
require("./config/express")(app, passport);
//require('./config/passport')(passport);
require("./config/routes")(app, passport);

connection
  .on("error", console.log)
  .on("disconnected", connect)
  .once("open", listen);

function listen() {
  if (app.get("env") === "test") return;
  server = app.listen(port);
  console.log("Server started - Listening on port " + port);
  if (process.send) {
    // Informs browser-refresh that the server is online
    process.send({ event: "online", url: "http://localhost:" + port });
  }
}

function connect() {
  var options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    server: {
      sslValidate: false,
    },
  };
  mongoose.connect(config.db, options);
  return mongoose.connection;
}

function close() {
  if (server) {
    server.close(() => {
      console.log("Http server closed.");
    });
  }
  if (mongoose) mongoose.disconnect();
}
