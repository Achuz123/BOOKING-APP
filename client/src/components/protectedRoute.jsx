import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getCurrentUser } from "../apicalls/users";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { Layout, Dropdown, message } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import logo from "../assets/logo.png";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userMenu = [
    {
      key: "1",
      label: (
        <span
          onClick={() =>
            user.isAdmin ? navigate("/admin") : navigate("/profile")
          }
        >
          My Profile
        </span>
      ),
      icon: <ProfileOutlined />,
    },
    {
      key: "2",
      label: (
        <Link to="/login" onClick={() => localStorage.removeItem("token")}>
          Log out
        </Link>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();
      if (response.success) {
        dispatch(setUser(response.data));
        if (!response.data.isAdmin && window.location.pathname === "/admin") {
          message.warning("You are not authorized");
          navigate("/");
        }
      } else {
        dispatch(setUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
      dispatch(hideLoading());
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
  }, []);

  return (
    user && (
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            width: "100%",
            backgroundColor: "#CBD4E6", // Soft Blue-Gray Navbar
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 30px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            borderBottom: "1px solid rgba(43, 27, 61, 0.2)", // Subtle dark purple line
          }}
        >
          {/* Logo and Title */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "65px",
                height: "65px",
                objectFit: "contain",
              }}
            />
            <h3
              className="m-0 text-2xl font-bold"
              style={{ color: "#2B1B3D" }} // Dark Purple text
            >
              SCREENLY
            </h3>
          </div>

          {/* Navbar Items */}
          <div className="flex items-center gap-8">
            <div
              className="cursor-pointer text-lg flex items-center gap-1 hover:underline"
              style={{ color: "#2B1B3D" }}
              onClick={() => navigate("/")}
            >
              <HomeOutlined />
              <span>Home</span>
            </div>

            <Dropdown
              menu={{ items: userMenu }}
              trigger={["click"]}
              placement="bottom"
            >
              <div
                className="cursor-pointer text-lg flex items-center gap-1 hover:underline"
                style={{ color: "#2B1B3D" }}
              >
                <UserOutlined />
                <span>{user.name}</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* Background */}
        <div
          style={{
            padding: 24,
            minHeight: "calc(100vh - 64px)",
            background: "#EAE6F7", // Light Pastel Purple for body
          }}
        >
          {children}
        </div>
      </Layout>
    )
  );
}

export default ProtectedRoute;
