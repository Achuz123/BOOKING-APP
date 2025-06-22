import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";

import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllTheatresAdmin } from "../../apicalls/theaters";
import { useDispatch } from "react-redux";

function ThreatresTable() {
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();
  //to get the theatre data

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

  //columns for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, data) => {
        return data.owner && data.owner.name;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, data) => {
        if (data.isActive) {
          return "Approved";
        } else {
          return "Pending/ Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            {data.isActive ? (
              <Button onClick={() => handleStatusChange(data)}>Block</Button>
            ) : (
              <Button onClick={() => handleStatusChange(data)}>Approve</Button>
            )}
          </div>
        );
      },
    },
  ];
  ///use effect to call it egverytime the page runs

  useEffect(() => {
    getData();
  }, []);

  return <> {<Table dataSource={theatres} columns={columns} />}</>;
}

export default ThreatresTable;
