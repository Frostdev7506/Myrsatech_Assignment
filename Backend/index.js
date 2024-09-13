const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 5000;

// Cache setup
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

// Service to fetch stories
class HackerNewsService {
  async getNewStories(page = 1, limit = 20) {
    const cachedStories = cache.get("newStories");
    if (cachedStories) {
      return this.paginate(cachedStories, page, limit);
    }

    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );
    const storyIds = response.data;
    const stories = await Promise.all(
      storyIds.map(async (id) => {
        const storyResponse = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        return storyResponse.data;
      })
    );
    cache.set("newStories", stories);
    return this.paginate(stories, page, limit);
  }

  async searchStories(query, page = 1, limit = 20) {
    const cachedStories = cache.get("newStories");
    if (!cachedStories) {
      await this.getNewStories();
    }
    const stories = cache.get("newStories");
    const filteredStories = stories.filter((story) =>
      story.title.toLowerCase().includes(query.toLowerCase())
    );
    return this.paginate(filteredStories, page, limit);
  }

  paginate(array, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return array.slice(startIndex, endIndex);
  }
}

// Controller to handle requests
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

  async searchStories(req, res) {
    const { query, page = 1, limit = 20 } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    const stories = await this.hackerNewsService.searchStories(
      query,
      parseInt(page),
      parseInt(limit)
    );
    res.json(stories);
  }
}

// Middleware for dependency injection
const hackerNewsService = new HackerNewsService();
const hackerNewsController = new HackerNewsController(hackerNewsService);

app.use((req, res, next) => {
  req.hackerNewsController = hackerNewsController;
  next();
});

// Routes
app.get("/new-stories", (req, res) =>
  req.hackerNewsController.getNewStories(req, res)
);

app.get("/search-stories", (req, res) =>
  req.hackerNewsController.searchStories(req, res)
);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
