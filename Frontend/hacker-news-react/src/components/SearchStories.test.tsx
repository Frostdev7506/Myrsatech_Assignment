import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchStories from "./SearchStories";
import { searchStories } from "../services/HackerNewsService";

// Mock the HackerNewsService
jest.mock("../services/HackerNewsService", () => ({
  searchStories: jest.fn(),
}));

describe("SearchStories", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component", async () => {
    (searchStories as jest.Mock).mockResolvedValueOnce([]);
    render(<SearchStories />);
    expect(screen.getByText("Search Stories")).toBeInTheDocument();
  });

  it("searches for stories and displays them", async () => {
    const mockStories = [
      { title: "Story 1", url: "http://example.com/1" },
      { title: "Story 2", url: "http://example.com/2" },
    ];
    (searchStories as jest.Mock).mockResolvedValueOnce(mockStories);

    render(<SearchStories />);

    fireEvent.change(screen.getByPlaceholderText("Search stories..."), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("Story 1")).toBeInTheDocument();
      expect(screen.getByText("Story 2")).toBeInTheDocument();
    });
  });

  it("handles pagination", async () => {
    (searchStories as jest.Mock).mockResolvedValueOnce([]);

    render(<SearchStories />);

    fireEvent.change(screen.getByPlaceholderText("Search stories..."), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByText("Search"));

    fireEvent.click(screen.getByText("Next Page"));
    expect(searchStories).toHaveBeenCalledWith(
      "test",
      2,
      20,
      expect.any(Function)
    );

    fireEvent.click(screen.getByText("Previous Page"));
    expect(searchStories).toHaveBeenCalledWith(
      "test",
      1,
      20,
      expect.any(Function)
    );
  });
});
