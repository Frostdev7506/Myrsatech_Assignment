// src/controllers/hackerNewsController.js
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

module.exports = HackerNewsController;
