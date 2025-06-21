import React, { Children } from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import ThreatresTable from "./ThreatresTable";
import MoviesList from "./MoviesList";

function Admin() {
  const { user } = useSelector((state) => state.user);
  const items = [
    { key: "1", label: "Movies", children: <MoviesList /> },
    { key: "2", label: "Threatre", children: <ThreatresTable /> },
  ];
  return (
    <div>
      <h1>Welcome {user.name} To Your Profile</h1>
      <Tabs defaultActiveKey="2" items={items} />
    </div>
  );
}

export default Admin;
