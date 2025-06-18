import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div style={overlayStyle}>
      <Spin size="large">
        <div style={{ minHeight: 80 }} />
      </Spin>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

export default Loader;
