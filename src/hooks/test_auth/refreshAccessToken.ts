import axiosInstance from "./axiosInstance";

async function refreshAccessToken(): Promise<string> {
  try {
    const response = await axiosInstance.post("/auth/refresh-token");
    return response.data.access_token;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
}

export default refreshAccessToken;
