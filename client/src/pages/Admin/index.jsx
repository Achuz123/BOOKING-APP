import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import ThreatresTable from "./ThreatresTable";
import MoviesList from "./MoviesList";

function Admin() {
  const { user } = useSelector((state) => state.user);

  const items = [
    { key: "1", label: "Movies", children: <MoviesList /> },
    { key: "2", label: "Theatres", children: <ThreatresTable /> },
  ];

  return (
    <div
      className="p-8 min-h-screen"
      style={{
        backgroundColor: "#EAE6F7",
      }}
    >
      <h1
        className="text-2xl font-semibold mb-6"
        style={{
          color: "#2B1B3D",
        }}
      >
        Welcome {user.name} To Your Admin Panel
      </h1>

      <div
        className="rounded-lg shadow-md p-5"
        style={{
          backgroundColor: "#F5F5F5",
        }}
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          tabBarStyle={{
            color: "#2B1B3D",
            fontWeight: "500",
          }}
          indicator={{ color: "#D62828" }} // For active underline in newer antd
        />
      </div>
    </div>
  );
}

export default Admin;
