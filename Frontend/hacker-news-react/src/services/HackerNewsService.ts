import axios from "axios";

const apiUrl = "http://localhost:5000";

export const getNewStories = async (
  page: number,
  limit: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  try {
    const response = await axios.get(
      `${apiUrl}/new-stories?page=${page}&limit=${limit}`
    );
    setLoading(false);
    return response.data;
  } catch (error) {
    setLoading(false);
    throw new Error("Something went wrong; please try again later.");
  }
};

export const searchStories = async (
  query: string,
  page: number,
  limit: number,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  try {
    const response = await axios.get(
      `${apiUrl}/search-stories?query=${query}&page=${page}&limit=${limit}`
    );
    setLoading(false);
    return response.data;
  } catch (error) {
    setLoading(false);
    throw new Error("Something went wrong; please try again later.");
  }
};
