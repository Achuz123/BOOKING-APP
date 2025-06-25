import { Col, Modal, Row, Form, Input, Button, message } from "antd";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { addTheatre, updateTheatre } from "../../apicalls/theaters";
import TextArea from "antd/es/input/TextArea";

const TheatreFormModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  formType,
  getData,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response = null;
      if (formType === "add") {
        response = await addTheatre({ ...values, owner: user._id });
      } else {
        values.theatreId = selectedTheatre._id;
        response = await updateTheatre(values);
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

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    <Modal
      centered
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={isModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        initialValues={selectedTheatre}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Theatre Name"
              name="name"
              rules={[{ required: true, message: "Theatre name is required" }]}
            >
              <Input placeholder="Enter theatre name" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Theatre Address"
              name="address"
              rules={[{ required: true, message: "Address is required" }]}
            >
              <TextArea rows={3} placeholder="Enter theatre address" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Email is required" }]}
                >
                  <Input type="email" placeholder="Enter email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    { required: true, message: "Phone number is required" },
                  ]}
                >
                  <Input type="number" placeholder="Enter phone number" />
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
              backgroundColor: "#D62828",
              color: "#fff",
              border: "none",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            {formType === "add" ? "Add Theatre" : "Update Theatre"}
          </Button>

          <Button
            className="mt-3"
            block
            onClick={handleCancel}
            style={{
              backgroundColor: "#2B1B3D",
              color: "white",
              border: "none",
              marginTop: "10px",
              fontWeight: "500",
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TheatreFormModal;
