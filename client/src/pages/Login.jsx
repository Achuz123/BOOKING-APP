import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { Link } from "react-router-dom";

function login() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-md p-6">
          <h2 className="font-bold text-2xl mb-6 text-center">
            Login To BOOKMYSHOW
          </h2>

          <Form
            layout="vertical"
            style={{ width: "100%" }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <div className="hover:ring-2 hover:ring-blue-300 focus-within:ring-2 focus-within:ring-blue-500 rounded transition duration-200">
                <Input className="!bg-blue-50 !border-none !shadow-none !text-black" />
              </div>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <div className="hover:ring-2 hover:ring-blue-300 focus-within:ring-2 focus-within:ring-blue-500 rounded transition duration-200">
                <Input.Password className="!bg-blue-50 !border-none !shadow-none !text-black" />{" "}
              </div>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center">
            <p>
              New User ?{" "}
              <Link to="/register" className="text-blue-500">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
