import React, { Children } from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import TheatreList from "./TheatreList";
import Booking from "./Booking";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const items = [
    { key: "1", label: "Theatres", children: <TheatreList></TheatreList> },
    { key: "2", label: "Booking", children: <Booking></Booking> },
  ];
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#2B1B3D]">
        Welcome {user.name} To Your Profile
      </h1>
      <Tabs defaultActiveKey="2" items={items} />
    </div>
  );
}

export default Profile;
