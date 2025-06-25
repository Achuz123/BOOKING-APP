import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllTheatresAdmin, updateTheatre } from "../../apicalls/theaters";
import { useDispatch } from "react-redux";

function ThreatresTable() {
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllTheatresAdmin();
      if (response.success) {
        const allTheatres = response.data;
        setTheatres(
          allTheatres.map((item) => ({ ...item, key: `theatre${item._id}` }))
        );
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const handleStatusChange = async (theatre) => {
    try {
      dispatch(showLoading());
      const values = {
        theatreId: theatre._id,
        isActive: !theatre.isActive,
      };
      const response = await updateTheatre(values);
      if (response.success) {
        message.success(response.message);
        getData();
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, data) => data.owner?.name,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, data) =>
        data.isActive ? (
          <span style={{ color: "#2B1B3D", fontWeight: "600" }}>Approved</span>
        ) : (
          <span style={{ color: "#666877", fontStyle: "italic" }}>
            Pending / Blocked
          </span>
        ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => (
        <Button
          style={{
            backgroundColor: data.isActive ? "#D62828" : "#2B1B3D",
            color: "#fff",
            border: "none",
          }}
          onClick={() => handleStatusChange(data)}
        >
          {data.isActive ? "Block" : "Approve"}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <Table
      dataSource={theatres}
      columns={columns}
      pagination={{ pageSize: 6 }}
      bordered
      style={{
        backgroundColor: "#F5F5F5",
        borderRadius: "10px",
      }}
    />
  );
}

export default ThreatresTable;
