import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import DeleteMovieModal from "./DeleteMovieModel";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../apicalls/movies";
import moment from "moment";
import MovieFormModal from "./MovieFormModel";

const MovieList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [movies, setMovies] = useState(null);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      if (response.success) {
        const allMovies = response.data;
        setMovies(
          allMovies.map((item) => ({
            ...item,
            key: `movie${item._id}`,
          }))
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
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => (
        <img
          src={data.poster}
          alt="Movie Poster"
          width="70"
          height="100"
          style={{
            objectFit: "cover",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />
      ),
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => (
        <span style={{ color: "#666877" }}>
          {text.length > 60 ? text.substring(0, 60) + "..." : text}
        </span>
      ),
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => `${text}m`,
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text) => moment(text).format("MM-DD-YYYY"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => (
        <div className="flex gap-3">
          <Button
            style={{
              backgroundColor: "#D62828",
              color: "#fff",
              border: "none",
            }}
            onClick={() => {
              setIsModalOpen(true);
              setFormType("edit");
              setSelectedMovie(data);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            style={{
              backgroundColor: "#2B1B3D",
              color: "#fff",
              border: "none",
            }}
            onClick={() => {
              setIsDeleteModalOpen(true);
              setSelectedMovie(data);
            }}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          icon={<PlusOutlined />}
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
          Add Movie
        </Button>
      </div>
      <Table
        dataSource={movies}
        columns={columns}
        pagination={{ pageSize: 6 }}
        bordered
        style={{ backgroundColor: "#F5F5F5" }}
        rowClassName={() => "hover:bg-[#F5F5F5]"}
        scroll={{ x: true }}
      />
      {isModalOpen && (
        <MovieFormModal
          isModalOpen={isModalOpen}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMovieModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedMovie={selectedMovie}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedMovie={setSelectedMovie}
          getData={getData}
        />
      )}
    </>
  );
};

export default MovieList;
