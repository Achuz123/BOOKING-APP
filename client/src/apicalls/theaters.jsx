import { axiosInstance } from "./index.jsx";

export const addTheatre = async (value) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
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
      "/api/theatres/update-theatre",
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
    const response = await axiosInstance.put(
      "/api/theatres/delete-theatre",
      value
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
/////////////////////////////////////////////////

export const getAllTheatres = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-owner",
      payload
    );
    return response.data;
  } catch (err) {
    return err.response;
  }
};
////////////////////////////////////////////////////////////////
export const getAllTheatresAdmin = async () => {
  try {
    const response = await axiosInstance.get("/api/theatres/get-all-theatres");
    return response.data;
  } catch (err) {
    return err.response;
  }
};
