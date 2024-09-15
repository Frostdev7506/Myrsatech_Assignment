import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import NewStories from "./NewStories";
import { getNewStories } from "../services/HackerNewsService";

// Mock the HackerNewsService
jest.mock("../services/HackerNewsService", () => ({
  getNewStories: jest.fn(),
}));

describe("NewStories", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("renders the component", async () => {
    (getNewStories as jest.Mock).mockResolvedValueOnce([]);
    render(<NewStories />);
    expect(screen.getByText("New Stories")).toBeInTheDocument();
  });

  it("fetches new stories and displays them", async () => {
    const mockStories = [
      { title: "Story 1", url: "http://example.com/1" },
      { title: "Story 2", url: "http://example.com/2" },
    ];
    (getNewStories as jest.Mock).mockResolvedValueOnce(mockStories);

    render(<NewStories />);

    await waitFor(() => {
      expect(screen.getByText("Story 1")).toBeInTheDocument();
      expect(screen.getByText("Story 2")).toBeInTheDocument();
    });
  });

  it("shows a loading indicator while fetching new stories", async () => {
    (getNewStories as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(<NewStories />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays an error message when fetching new stories fails", async () => {
    (getNewStories as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    render(<NewStories />);

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
    });
  });

  it("handles pagination", async () => {
    (getNewStories as jest.Mock).mockResolvedValueOnce([]);

    render(<NewStories />);

    fireEvent.click(screen.getByText("Next Page"));
    expect(getNewStories).toHaveBeenCalledWith(2, 20, expect.any(Function));

    fireEvent.click(screen.getByText("Previous Page"));
    expect(getNewStories).toHaveBeenCalledWith(1, 20, expect.any(Function));
  });

  it("calls getNewStories with correct parameters", async () => {
    const mockStories = [{ title: "Story 1" }];
    (getNewStories as jest.Mock).mockResolvedValueOnce(mockStories);

    render(<NewStories />);

    await waitFor(() => {
      expect(getNewStories).toHaveBeenCalledWith(1, 20, expect.any(Function));
    });
  });
});
