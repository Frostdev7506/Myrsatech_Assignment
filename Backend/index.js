// src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const HackerNewsService = require("./services/hackerNewsService");
const HackerNewsController = require("./controllers/hackerNewsController");
const hackerNewsMiddleware = require("./middleware/hackerNewsMiddleware");
const NodeCache = require("node-cache");

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
const domain = process.env.DOMAIN || "http://localhost";
const cache = new NodeCache({ stdTTL: 600 });

const hackerNewsService = new HackerNewsService(cache);
const hackerNewsController = new HackerNewsController(hackerNewsService);

app.use(hackerNewsMiddleware(hackerNewsController));

app.get("/new-stories", (req, res) =>
  req.hackerNewsController.getNewStories(req, res)
);

app.get("/search-stories", (req, res) =>
  req.hackerNewsController.searchStories(req, res)
);

let server;

function startServer() {
  return new Promise((resolve) => {
    server = app.listen(port, () => {
      console.log(`Server is running on ${domain}:${port}`);
      resolve();
    });
  });
}

function stopServer() {
  return new Promise((resolve) => {
    server.close(() => {
      console.log("Server stopped");
      resolve();
    });
  });
}

// Start the server directly in production
if (process.env.NODE_ENV !== "test") {
  startServer();
}

module.exports = {
  HackerNewsService,
  HackerNewsController,
  startServer,
  stopServer,
};
