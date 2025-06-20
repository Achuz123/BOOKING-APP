import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getCurrentUser } from "../apicalls/users";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { Layout, Menu, Dropdown, message } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

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
        if (!response.data.isAdmin && window.location.pathname == "/admin") {
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
          className="flex justify-between"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 className="text-white m-0">Book My Show</h3>

          <div className="flex items-center gap-6">
            <Menu
              theme="dark"
              mode="horizontal"
              items={[
                {
                  key: "home",
                  icon: <HomeOutlined />,
                  label: <span onClick={() => navigate("/")}>Home</span>,
                },
              ]}
            />

            <Dropdown menu={{ items: userMenu }} trigger={["click"]}>
              <div className="text-white cursor-pointer flex items-center gap-2 ">
                <UserOutlined />
                <span>{user.name}</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </Layout>
    )
  );
}

export default ProtectedRoute;
