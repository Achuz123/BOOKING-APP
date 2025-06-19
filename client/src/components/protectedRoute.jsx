import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getValidUser = async () => {
    try {
      dispatch(showLoading()); // fix 1
      const response = await getCurrentUser();
      console.log(response);
      dispatch(hideLoading()); // fix 2 // Optional: redirect if token is invalid

      if (!response.success) {
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());

      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []); // fix 3

  return <div>{children}</div>;
}

export default ProtectedRoute;

/*import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

function protectedRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //childern is the next page you want to show in case the user is authorized .Add it to /home is App.jsx

  const getValidUser = async () => {
    try {
      dispatch(showLoading);
      const response = await getCurrentUser();
      console.log(response);
      dispatch(hideLoading);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  });

  return <div>{children} </div>;
}

export default protectedRoute;*/
