import React from "react";
import { Col, Modal, Row, Form, Input, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { addTheatre } from "../../apicalls/theaters";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { useNavigate } from "react-router-dom";

//the model will open and close basced on that boolean value
function TheatreFormModal({ isModelOpen, setIsModelOpen }) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitForm = async (payload) => {
    try {
      dispatch(showLoading());
      const response = await addTheatre({ ...payload, owner: user._id });
      if (response.success) {
        message.success("Added Sucessfully");
        dispatch(hideLoading());
        setIsModelOpen(false);
      }
    } catch (error) {
      console.log(error.data);
    }
  };
  return (
    <>
      <Modal
        open={isModelOpen}
        footer={null}
        closeIcon={null}
        title="Add New Theatre"
      >
        <Form
          layout="vertical"
          style={{ width: "100%" }}
          onFinish={onSubmitForm}
        >
          <Row
            gutter={{
              xs: 6,
              sm: 10,
              md: 12,
              lg: 16,
            }}
          >
            <Col span={24}>
              <Form.Item
                label="Theatre Name"
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[
                  { required: true, message: "Theatre name is required!" },
                ]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter the theatre name"
                ></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Theatre Address"
                htmlFor="address"
                name="address"
                className="d-block"
                rules={[
                  { required: true, message: "Theatre name is required!" },
                ]}
              >
                <TextArea
                  id="address"
                  rows="3"
                  placeholder="Enter the theatre name"
                ></TextArea>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row
                gutter={{
                  xs: 6,
                  sm: 10,
                  md: 12,
                  lg: 16,
                }}
              >
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    htmlFor="email"
                    name="email"
                    className="d-block"
                    rules={[{ required: true, message: "Email  is required!" }]}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter the email"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone Number"
                    htmlFor="phone"
                    name="phone"
                    className="d-block"
                    rules={[
                      { required: true, message: "Phone number is required!" },
                    ]}
                  >
                    <Input
                      id="phone"
                      type="number"
                      placeholder="Enter the phone number"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              Submit the Data
            </Button>
            <Button
              block
              className="mt-3"
              onClick={() => {
                setIsModelOpen(false);
              }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default TheatreFormModal;
