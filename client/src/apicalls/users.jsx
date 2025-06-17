import { axiosInstance } from "./index.jsx";
//This bascially does what the postman does to post and get data

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/register", value);
    return response.data;

    // the first part  what we put in as route in postman
    // The second part is the json request body
    // if we store that in a value we ill get the response with suxess and message
  } catch (error) {
    console.log(error);
  }
};

// now this funtion will be called in the register page
