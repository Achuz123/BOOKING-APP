import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../../apicalls/movies";
import moment from "moment";

const MovieFormModal = ({
  isModalOpen,
  setIsModalOpen,
  formType,
  selectedMovie,
  setSelectedMovie,
  getData,
}) => {
  const dispatch = useDispatch();

  const handleChange = (value) => {};

  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format(
      "YYYY-MM-DD"
    );
  }

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response = null;
      if (formType === "add") {
        response = await addMovie(values);
      } else {
        response = await updateMovie({ ...values, movieId: selectedMovie._id });
      }

      if (response.success) {
        getData();
        message.success(response.message);
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };
  // const handleOk = () => {
  //   setIsModalOpen(false); onOk={handleOk}
  // }

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Modal
      centered
      title={
        <span
          style={{
            color: "#2B1B3D",
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          {formType === "add" ? "Add Movie" : "Edit Movie"}
        </span>
      }
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        initialValues={selectedMovie}
        onFinish={onFinish}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label="Movie Name"
              name="title"
              rules={[{ required: true, message: "Movie name is required!" }]}
            >
              <Input placeholder="Enter the movie name" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <TextArea rows={4} placeholder="Enter the description" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  label="Duration (in min)"
                  name="duration"
                  rules={[
                    { required: true, message: "Movie duration is required!" },
                  ]}
                >
                  <Input type="number" placeholder="Enter duration" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Language"
                  name="language"
                  rules={[
                    { required: true, message: "Movie language is required!" },
                  ]}
                >
                  <Select
                    placeholder="Select Language"
                    options={[
                      { value: "English", label: "English" },
                      { value: "Hindi", label: "Hindi" },
                      { value: "Punjabi", label: "Punjabi" },
                      { value: "Telugu", label: "Telugu" },
                      { value: "Bengali", label: "Bengali" },
                      { value: "German", label: "German" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Release Date"
                  name="releaseDate"
                  rules={[
                    { required: true, message: "Release date is required!" },
                  ]}
                >
                  <Input type="date" placeholder="Select date" />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  label="Genre"
                  name="genre"
                  rules={[
                    { required: true, message: "Movie genre is required!" },
                  ]}
                >
                  <Select
                    placeholder="Select Genre"
                    options={[
                      { value: "Action", label: "Action" },
                      { value: "Comedy", label: "Comedy" },
                      { value: "Horror", label: "Horror" },
                      { value: "Love", label: "Love" },
                      { value: "Patriot", label: "Patriot" },
                      { value: "Bhakti", label: "Bhakti" },
                      { value: "Thriller", label: "Thriller" },
                      { value: "Mystery", label: "Mystery" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col span={16}>
                <Form.Item
                  label="Poster URL"
                  name="poster"
                  rules={[
                    { required: true, message: "Poster URL is required!" },
                  ]}
                >
                  <Input placeholder="Enter poster URL" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item>
          <Button
            block
            htmlType="submit"
            style={{
              backgroundColor: "#2B1B3D",
              color: "#fff",
              border: "none",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            Submit
          </Button>
          <Button
            block
            onClick={handleCancel}
            style={{
              backgroundColor: "#D62828",
              color: "#fff",
              border: "none",
              marginTop: "10px",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default MovieFormModal;
