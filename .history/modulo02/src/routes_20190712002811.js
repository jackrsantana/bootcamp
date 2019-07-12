const express = require("express");

class App {
  constructor() {
    this.server = express();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {}
}
