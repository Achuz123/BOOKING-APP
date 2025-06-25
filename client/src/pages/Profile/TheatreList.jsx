import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import TheatreFormModal from "./theatreForm";
import DeleteTheatreModal from "./deleteTheatreModel";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { getAllTheatres } from "../../apicalls/theaters";
import ShowModal from "./showModel";

const TheatreList = () => {
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState("add");
  const [theatres, setTheatres] = useState([]);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllTheatres({ owner: user._id });
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
        <div className="flex items-center gap-2">
          <Button
            style={{
              backgroundColor: "#2B1B3D",
              color: "#fff",
              border: "none",
            }}
            onClick={() => {
              setIsModalOpen(true);
              setFormType("edit");
              setSelectedTheatre(data);
            }}
          >
            <EditOutlined />
          </Button>

          <Button
            style={{
              backgroundColor: "#D62828",
              color: "#fff",
              border: "none",
            }}
            onClick={() => {
              setIsDeleteModalOpen(true);
              setSelectedTheatre(data);
            }}
          >
            <DeleteOutlined />
          </Button>

          {data.isActive && (
            <Button
              style={{
                backgroundColor: "#2B1B3D",
                color: "#fff",
                border: "none",
              }}
              onClick={() => {
                setIsShowModalOpen(true);
                setSelectedTheatre(data);
              }}
            >
              <PlusOutlined /> Shows
            </Button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className="p-6 rounded-lg"
      style={{ backgroundColor: "#F5F5F5", borderRadius: "10px" }}
    >
      <div className="flex justify-end mb-4">
        <Button
          style={{
            backgroundColor: "#D62828",
            color: "#fff",
            border: "none",
          }}
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          + Add Theatre
        </Button>
      </div>

      <Table
        dataSource={theatres}
        columns={columns}
        pagination={{ pageSize: 6 }}
        bordered
      />

      {isModalOpen && (
        <TheatreFormModal
          isModalOpen={isModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteTheatreModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedTheatre={selectedTheatre}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}

      {isShowModalOpen && (
        <ShowModal
          isShowModalOpen={isShowModalOpen}
          setIsShowModalOpen={setIsShowModalOpen}
          selectedTheatre={selectedTheatre}
        />
      )}
    </div>
  );
};

export default TheatreList;
