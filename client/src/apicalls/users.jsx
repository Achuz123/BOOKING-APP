import { axiosInstance } from "./index.jsx";
//This bascially does what the postman does to post and get data

//CODE FOR REGISTER
export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/register", value);
    return response.data; //response will have so many stuff like satus code and error we only want the data we send so we use .data

    // the first part  what we put in as route in postman
    // The second part is the json request body
    // if we store that in a value we ill get the response with suxess and message
  } catch (error) {
    console.log(error);
  }
};

// now this funtion will be called in the register page

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//CODE FOR USER

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("/api/users/login", value);
    return response.data; //response will have so many stuff like satus code and error we only want the data we send so we use .data

    // the first part  what we put in as route in postman
    // The second part is the json request body
    // if we store that in a value we ill get the response with suxess and message
  } catch (error) {
    console.log(error);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//CODE FOR USERCHECK

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-user");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
