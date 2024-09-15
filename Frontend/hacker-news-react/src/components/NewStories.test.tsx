import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  act,
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

  it("shows a loading indicator while fetching new stories", async () => {
    const mockStories = [
      { title: "Story 1", url: "http://example.com/1" },
      { title: "Story 2", url: "http://example.com/2" },
    ];
    (getNewStories as jest.Mock).mockResolvedValueOnce(mockStories);

    await act(async () => {
      render(<NewStories />);
    });
    // Check if the spinner is visible while fetching
    expect(screen.getByTestId("spinner-container")).toBeInTheDocument();
  });

  it("handles pagination for NewStories", async () => {
    (getNewStories as jest.Mock).mockResolvedValueOnce([]);

    await act(async () => {
      render(<NewStories />);
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("Next Page"));
    });

    expect(getNewStories).toHaveBeenCalledWith(2, 20, expect.any(Function));

    await act(async () => {
      fireEvent.click(screen.getByTestId("Previous Page"));
    });

    expect(getNewStories).toHaveBeenCalledWith(1, 20, expect.any(Function));
  });

  it("calls getNewStories with correct parameters", async () => {
    const mockStories = [{ title: "Story 1" }];
    (getNewStories as jest.Mock).mockResolvedValueOnce(mockStories);

    await act(async () => {
      render(<NewStories />);
    });

    await waitFor(() => {
      expect(getNewStories).toHaveBeenCalledWith(1, 20, expect.any(Function));
    });
  });
});
