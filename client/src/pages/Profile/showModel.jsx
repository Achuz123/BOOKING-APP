import {
  Col,
  Modal,
  Row,
  Form,
  Input,
  Button,
  Select,
  Table,
  message,
} from "antd";

import { useDispatch } from "react-redux";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../apicalls/movies";
import {
  addShow,
  deleteShow,
  getShowsByTheatre,
  updateShow,
} from "../../apicalls/shows";
import moment from "moment";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

const ShowModal = ({
  isShowModalOpen,
  setIsShowModalOpen,
  selectedTheatre,
}) => {
  const [view, setView] = useState("table");
  const [movies, setMovies] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [shows, setShows] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const dispatch = useDispatch();

  // FUNCTION TO FETCH DATA
  const getData = async () => {
    try {
      dispatch(showLoading());
      const movieResponse = await getAllMovies();
      if (movieResponse.success) {
        setMovies(movieResponse.data);
      } else {
        message.error(movieResponse.message);
      }

      const showResponse = await getShowsByTheatre({
        theatreId: selectedTheatre._id,
      });
      if (showResponse.success) {
        setShows(showResponse.data);
      } else {
        message.error(showResponse.message);
      }

      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  // FORM SUBMIT FUNCTION
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response = null;
      if (view === "form") {
        response = await addShow({ ...values, theatre: selectedTheatre._id });
      } else {
        response = await updateShow({
          ...values,
          showId: selectedShow._id,
          theatre: selectedTheatre._id,
        });
      }
      if (response.success) {
        getData();
        message.success(response.message);
        setView("table");
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const handleCancel = () => {
    setIsShowModalOpen(false);
  };

  const handleDelete = async (showId) => {
    try {
      dispatch(showLoading());
      const response = await deleteShow({ showId: showId });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Show Date",
      dataIndex: "date",
      render: (text) => moment(text).format("MMM Do YYYY"),
    },
    {
      title: "Show Time",
      dataIndex: "time",
      render: (text) => moment(text, "HH:mm").format("hh:mm A"),
    },
    {
      title: "Movie",
      dataIndex: "movie",
      render: (text, data) => data.movie.title,
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
      key: "ticketPrice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
      key: "totalSeats",
    },
    {
      title: "Available Seats",
      dataIndex: "seats",
      render: (text, data) => data.totalSeats - data.bookedSeats.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                setView("edit");
                setSelectedMovie(data.movie);
                setSelectedShow({
                  ...data,
                  date: moment(data.date).format("YYYY-MM-DD"),
                });
              }}
            >
              <EditOutlined />
            </Button>
            <Button onClick={() => handleDelete(data._id)}>
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      centered
      title={selectedTheatre.name}
      open={isShowModalOpen}
      onCancel={handleCancel}
      width={1200}
      footer={null}
    >
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold text-lg">
          {view === "table"
            ? "List of Shows"
            : view === "form"
            ? "Add Show"
            : "Edit Show"}
        </h3>
        {view === "table" && (
          <Button type="primary" onClick={() => setView("form")}>
            Add Show
          </Button>
        )}
      </div>

      {view === "table" && <Table dataSource={shows} columns={columns} />}

      {(view === "form" || view === "edit") && (
        <Form
          layout="vertical"
          initialValues={view === "edit" ? selectedShow : null}
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Show Name"
                name="name"
                rules={[{ required: true, message: "Show name is required" }]}
              >
                <Input placeholder="Enter the show name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Show Date"
                name="date"
                rules={[{ required: true, message: "Date is required" }]}
              >
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Show Time"
                name="time"
                rules={[{ required: true, message: "Time is required" }]}
              >
                <Input type="time" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Movie"
                name="movie"
                rules={[{ required: true, message: "Movie is required" }]}
              >
                <Select
                  placeholder="Select Movie"
                  value={selectedMovie && selectedMovie.title}
                  options={
                    movies &&
                    movies.map((movie) => ({
                      label: movie.title,
                      value: movie._id,
                    }))
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Ticket Price"
                name="ticketPrice"
                rules={[
                  { required: true, message: "Ticket price is required" },
                ]}
              >
                <Input type="number" placeholder="Enter ticket price" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Total Seats"
                name="totalSeats"
                rules={[
                  { required: true, message: "Total seats are required" },
                ]}
              >
                <Input type="number" placeholder="Enter total seats" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex gap-4 mt-4">
            <Button
              onClick={() => setView("table")}
              htmlType="button"
              icon={<ArrowLeftOutlined />}
            >
              Go Back
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-orange-500 hover:bg-orange-600 border-none"
            >
              {view === "form" ? "Add Show" : "Update Show"}
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default ShowModal;
