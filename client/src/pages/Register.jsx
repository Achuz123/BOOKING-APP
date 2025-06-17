import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../apicalls/users.jsx";

function Register() {
  //FUCTION THE RECIVES THE VALUES FROM THE FORM AND SEND IT TO THE BACKEND USING THE AXIOS INSTANCE
  const submitForm = async (value) => {
    try {
      console.log("Sending data to backend...", value);
      const res = await RegisterUser(value);
      //this is calling the fuction we created in users.jsx and is posting the values to that url and then the returned response is being stored
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //HTML FOR THE PAGE

    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6">
        <h2 className="font-bold text-2xl mb-6 text-center">
          Register To BOOKMYSHOW
        </h2>

        <Form
          layout="vertical"
          onFinish={submitForm} //when you click signup the values will automatically be stored and send to the specified fuction as parameter
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <div className="hover:ring-2 hover:ring-blue-300 focus-within:ring-2 focus-within:ring-blue-500 rounded transition duration-200">
              <Input className="!bg-blue-50 !border-none !shadow-none !text-black" />
            </div>
          </Form.Item>
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <div className="hover:ring-2 hover:ring-blue-300 focus-within:ring-2 focus-within:ring-blue-500 rounded transition duration-200">
              <Input className="!bg-blue-50 !border-none !shadow-none !text-black" />
            </div>
          </Form.Item>

          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
            Already a user ?{" "}
            <Link to="/login" className="text-blue-500">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
