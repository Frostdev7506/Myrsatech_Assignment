import React, { useState } from "react";
import { searchStories } from "../services/HackerNewsService";
import "./SearchStories.css"; // Import the CSS file

interface Story {
  url: string | undefined;
  title: string;
}

const SearchStories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      const data = await searchStories(query, page, limit, setLoading);
      setStories(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const nextPage = () => setPage(page + 1);
  const prevPage = () => page > 1 && setPage(page - 1);

  return (
    <div className="search-stories-container">
      <h1 className="search-stories-title">Search Stories</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stories..."
        className="search-stories-input"
      />
      <button onClick={handleSearch} className="search-stories-button">
        Search
      </button>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <ul className="search-stories-list">
          {stories.map((story, index) => (
            <li key={index} className="new-stories-item">
              <a href={story.url} target="_blank">
                {story.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <div className="search-stories-pagination">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="search-stories-pagination-button"
        >
          Previous Page
        </button>
        <button onClick={nextPage} className="search-stories-pagination-button">
          Next Page
        </button>
      </div>
    </div>
  );
};

export default SearchStories;
