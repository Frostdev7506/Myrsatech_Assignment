// src/tests/hackerNewsController.test.js
const HackerNewsService = require("../services/hackerNewsService");
const HackerNewsController = require("../controllers/hackerNewsController");
const { startServer, stopServer } = require("../index");

describe("HackerNewsController", () => {
  let hackerNewsService;
  let hackerNewsController;
  let req;
  let res;

  beforeAll(async () => {
    await startServer();
  }, 20000);

  afterAll(async () => {
    await stopServer();
  });

  beforeEach(() => {
    hackerNewsService = new HackerNewsService();
    hackerNewsController = new HackerNewsController(hackerNewsService);
    req = { query: {} };
    res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };
  });

  it("should get new stories", async () => {
    console.log("Running test: should get new stories");
    req.query = { page: 1, limit: 10 };
    hackerNewsService.getNewStories = jest.fn(() => Promise.resolve([]));

    await hackerNewsController.getNewStories(req, res);
    expect(hackerNewsService.getNewStories).toHaveBeenCalledWith(1, 10);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should search stories", async () => {
    console.log("Running test: should search stories");
    req.query = { query: "test", page: 1, limit: 10 };
    hackerNewsService.searchStories = jest.fn(() => Promise.resolve([]));

    await hackerNewsController.searchStories(req, res);
    expect(hackerNewsService.searchStories).toHaveBeenCalledWith("test", 1, 10);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should return error if query is missing", async () => {
    console.log("Running test: should return error if query is missing");
    req.query = { page: 1, limit: 10 };

    await hackerNewsController.searchStories(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Query parameter is required",
    });
  });
});
