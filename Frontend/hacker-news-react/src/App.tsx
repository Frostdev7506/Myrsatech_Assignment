import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NewStories from "./components/NewStories";
import SearchStories from "./components/SearchStories";
import "./App.css";

const App: React.FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">New Stories</Link>
            </li>
            <li>
              <Link to="/search">Search Stories</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<NewStories />} />
          <Route path="/search" element={<SearchStories />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
