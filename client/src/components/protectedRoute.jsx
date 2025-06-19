import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  //childern is the next page you want to show in case the user is authorized .Add it to /home is App.jsx
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();
      console.log(response);
      dispatch(hideLoading());

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
