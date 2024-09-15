// src/services/hackerNewsService.js
const axios = require("axios");
const NodeCache = require("node-cache");

class HackerNewsService {
  constructor(cache) {
    this.cache = cache;
  }

  async getNewStories(page = 1, limit = 20) {
    try {
      const cachedStories = this.cache.get("newStories");
      if (cachedStories) {
        return this.paginate(cachedStories, page, limit);
      }

      let response;
      try {
        response = await axios.get(
          "https://hacker-news.firebaseio.com/v0/newstories.json"
        );
      } catch (error) {
        console.error("The /newstories route of the API Error", error);
        throw new Error("Failed to fetch new stories");
      }

      const storyIds = response.data;
      if (!Array.isArray(storyIds)) {
        throw new Error("Invalid response format");
      }

      const stories = await Promise.all(
        storyIds.map(async (id) => {
          let storyResponse;
          try {
            storyResponse = await axios.get(
              `https://hacker-news.firebaseio.com/v0/item/${id}.json`
            );
          } catch (error) {
            console.error("The /item route of the API Error", error);
            return null;
          }
          return storyResponse.data;
        })
      );

      const validStories = stories.filter(
        (story) => story !== null && story.url
      );

      this.cache.set("newStories", validStories);
      return this.paginate(validStories, page, limit);
    } catch (error) {
      console.log("Error in getNewStories Method", error);
    }
  }

  async searchStories(query, page = 1, limit = 20) {
    const cachedStories = this.cache.get("newStories");
    if (!cachedStories) {
      await this.getNewStories();
    }
    const stories = this.cache.get("newStories");
    const filteredStories = stories.filter(
      (story) =>
        story.title.toLowerCase().includes(query.toLowerCase()) &&
        story.url !== ""
    );
    return this.paginate(filteredStories, page, limit);
  }

  paginate(array, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return array.slice(startIndex, endIndex);
  }
}

module.exports = HackerNewsService;
