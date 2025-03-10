import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const sendDataToBackend = async (data: object) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Data successfully sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};
