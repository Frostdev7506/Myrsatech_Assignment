import React, { useState, useEffect } from "react";
import { getNewStories } from "../services/HackerNewsService";
import "./NewStories.css"; // Import the CSS file

interface Story {
  url: string | undefined;
  title: string;
}

const NewStories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNewStories = async () => {
      try {
        const data = await getNewStories(page, limit, setLoading);
        setStories(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    };

    fetchNewStories();
  }, [page, limit]);

  const nextPage = () => setPage(page + 1);
  const prevPage = () => page > 1 && setPage(page - 1);

  return (
    <div className="new-stories-container">
      <h2 className="new-stories-title">New Stories</h2>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <ul className="new-stories-list">
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
          className="new-stories-button"
        >
          Previous Page
        </button>
        <button onClick={nextPage} className="new-stories-button">
          Next Page
        </button>
      </div>
    </div>
  );
};

export default NewStories;
