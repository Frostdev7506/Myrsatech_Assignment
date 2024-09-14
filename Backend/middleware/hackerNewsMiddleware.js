// src/middleware/hackerNewsMiddleware.js
module.exports = (hackerNewsController) => (req, res, next) => {
  req.hackerNewsController = hackerNewsController;
  next();
};
