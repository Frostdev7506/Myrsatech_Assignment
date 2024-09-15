import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchStories from "../components/SearchStories";
import { searchStories } from "../services/HackerNewsService";

jest.mock("../services/HackerNewsService");

describe("SearchStories Component", () => {
  const mockStories = [
    { url: "https://example.com/story1", title: "Story 1" },
    { url: "https://example.com/story2", title: "Story 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should correctly fetch and display stories based on the search query", async () => {
    (searchStories as jest.Mock).mockResolvedValue(mockStories);

    render(<SearchStories />);

    fireEvent.change(screen.getByPlaceholderText("Search stories..."), {
      target: { value: "React" },
    });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(screen.getByText("Story 1")).toBeInTheDocument();
      expect(screen.getByText("Story 2")).toBeInTheDocument();
    });
  });

  it("should display a loading spinner while fetching stories", async () => {
    (searchStories as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockStories), 1000))
    );

    render(<SearchStories />);

    fireEvent.change(screen.getByTestId("spinner-container"), {
      target: { value: "React" },
    });
    fireEvent.click(screen.getByText("Search"));

    expect(screen.getByTestId("spinner-container")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("spinner-container")).not.toBeInTheDocument();
    });
  });

  it("should handle errors gracefully and log appropriate error messages", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (searchStories as jest.Mock).mockRejectedValue(new Error("Network Error"));

    render(<SearchStories />);

    fireEvent.change(screen.getByPlaceholderText("Search stories..."), {
      target: { value: "React" },
    });
    fireEvent.click(screen.getByText("Search"));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith("Network Error");
    });

    consoleErrorSpy.mockRestore();
  });
});
