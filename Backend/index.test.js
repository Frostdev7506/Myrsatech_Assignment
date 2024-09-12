const request = require("supertest");
const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");

jest.mock("axios");

const app = express();
const cache = new NodeCache({ stdTTL: 600 });

class HackerNewsService {
  async getNewStories(page = 1, limit = 20) {
    const cachedStories = cache.get("newStories");
    if (cachedStories) {
      return this.paginate(cachedStories, page, limit);
    }

    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );
    const stories = response.data;
    cache.set("newStories", stories);
    return this.paginate(stories, page, limit);
  }

  paginate(array, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return array.slice(startIndex, endIndex);
  }
}

class HackerNewsController {
  constructor(hackerNewsService) {
    this.hackerNewsService = hackerNewsService;
  }

  async getNewStories(req, res) {
    const { page = 1, limit = 20 } = req.query;
    const stories = await this.hackerNewsService.getNewStories(
      parseInt(page),
      parseInt(limit)
    );
    res.json(stories);
  }
}

const hackerNewsService = new HackerNewsService();
const hackerNewsController = new HackerNewsController(hackerNewsService);

app.use((req, res, next) => {
  req.hackerNewsController = hackerNewsController;
  next();
});

app.get("/new-stories", (req, res) =>
  req.hackerNewsController.getNewStories(req, res)
);

describe("Hacker News API", () => {
  it("should fetch new stories", async () => {
    const stories = [1, 2, 3, 4, 5];
    axios.get.mockResolvedValue({ data: stories });

    const response = await request(app).get("/new-stories");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(stories.slice(0, 20));
  });

  it("should paginate stories", async () => {
    const stories = Array.from({ length: 50 }, (_, i) => i + 1);
    axios.get.mockResolvedValue({ data: stories });

    const response = await request(app).get("/new-stories?page=2&limit=10");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(stories.slice(10, 20));
  });
});
