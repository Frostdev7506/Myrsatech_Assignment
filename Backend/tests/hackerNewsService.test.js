// src/tests/hackerNewsService.test.js
const axios = require("axios");
const NodeCache = require("node-cache");
const HackerNewsService = require("../services/hackerNewsService");
const { startServer, stopServer } = require("../index");

jest.mock("axios");

describe("HackerNewsService", () => {
  let hackerNewsService;
  let cache;

  beforeAll(async () => {
    await startServer();
  }, 20000); // Increase timeout to 20000 ms

  afterAll(async () => {
    await stopServer();
  });

  beforeEach(() => {
    cache = new NodeCache({ stdTTL: 600 });
    hackerNewsService = new HackerNewsService(cache);
  });

  afterEach(() => {
    if (cache) {
      cache.flushAll();
    }
  });

  it("should fetch new stories and cache them", async () => {
    console.log("Running test: should fetch new stories and cache them");
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
    console.log("Running test: should return cached stories if available");
    const cachedStories = [
      { id: 1, title: "Cached Story 1" },
      { id: 2, title: "Cached Story 2" },
    ];
    cache.set("newStories", cachedStories);

    const result = await hackerNewsService.getNewStories();
    expect(result).toEqual(cachedStories);
  });

  it("should search stories by title", async () => {
    console.log("Running test: should search stories by title");
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
