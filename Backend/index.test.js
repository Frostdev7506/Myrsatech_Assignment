const axios = require("axios");
const NodeCache = require("node-cache");
const {
  HackerNewsService,
  HackerNewsController,
  startServer,
  stopServer,
} = require("./index");

jest.mock("axios");

describe("HackerNewsService", () => {
  let hackerNewsService;
  let cache;

  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    await stopServer();
  });

  beforeEach(() => {
    cache = new NodeCache({ stdTTL: 600 });
    hackerNewsService = new HackerNewsService(cache);
  });

  afterEach(() => {
    cache.flushAll();
  });

  it("should fetch new stories and cache them", async () => {
    const storyIds = [1, 2, 3];
    const stories = [
      { id: 1, title: "Story 1" },
      { id: 2, title: "Story 2" },
      { id: 3, title: "Story 3" },
    ];

    axios.get.mockResolvedValueOnce({ data: storyIds });
    axios.get.mockImplementation((url) => {
      const id = url.split("/").pop().replace(".json", "");
      return Promise.resolve({ data: stories.find((s) => s.id == id) });
    });

    const result = await hackerNewsService.getNewStories();
    expect(result).toEqual(stories);
    expect(cache.get("newStories")).toEqual(stories);
  });

  it("should return cached stories if available", async () => {
    const cachedStories = [
      { id: 1, title: "Cached Story 1" },
      { id: 2, title: "Cached Story 2" },
    ];
    cache.set("newStories", cachedStories);

    const result = await hackerNewsService.getNewStories();
    expect(result).toEqual(cachedStories);
  });

  it("should search stories by title", async () => {
    const cachedStories = [
      { id: 1, title: "Cached Story 1" },
      { id: 2, title: "Cached Story 2" },
      { id: 3, title: "Another Story" },
    ];
    cache.set("newStories", cachedStories);

    const result = await hackerNewsService.searchStories("Cached");
    expect(result).toEqual([
      { id: 1, title: "Cached Story 1" },
      { id: 2, title: "Cached Story 2" },
    ]);
  });
});

describe("HackerNewsController", () => {
  let hackerNewsService;
  let hackerNewsController;
  let req;
  let res;

  beforeAll(async () => {
    await startServer();
  });

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
    req.query = { page: 1, limit: 10 };
    hackerNewsService.getNewStories = jest.fn(() => Promise.resolve([]));

    await hackerNewsController.getNewStories(req, res);
    expect(hackerNewsService.getNewStories).toHaveBeenCalledWith(1, 10);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should search stories", async () => {
    req.query = { query: "test", page: 1, limit: 10 };
    hackerNewsService.searchStories = jest.fn(() => Promise.resolve([]));

    await hackerNewsController.searchStories(req, res);
    expect(hackerNewsService.searchStories).toHaveBeenCalledWith("test", 1, 10);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  it("should return error if query is missing", async () => {
    req.query = { page: 1, limit: 10 };

    await hackerNewsController.searchStories(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Query parameter is required",
    });
  });
});
