import axios from "axios";

export const addTheatre = async (value) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatre/add-theatre",
      value
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
///////////////////////////////////////////////////////////////////////////
export const updateTheatre = async (value) => {
  try {
    const response = await axiosInstance.put(
      "/api/theatre/update-theatre",
      value
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteTheatre = async (value) => {
  try {
    const response = await axiosInstance.delete(
      "/api/theatre/delete-theatre",
      value
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
