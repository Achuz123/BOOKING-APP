import React from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../apicalls/users.jsx";
import { useEffect } from "react";
import logo from "../../favicon/orange-logo.png"; //✅ Imported logo

function Register() {
  const navigate = useNavigate();

  // FUCTION THAT RECIVES THE VALUES FROM THE FORM AND SEND IT TO THE BACKEND USING THE AXIOS INSTANCE
  const submitForm = async (value) => {
    try {
      const res = await RegisterUser(value);
      // this is calling the fuction we created in users.jsx and is posting the values to that url and then the returned response is being stored

      // to display the response message on screen
      if (res.success) {
        message.success(res.message);
        // redirect to login page after successful register
        navigate("/login");
      } else message.error(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  return (
    // HTML FOR THE PAGE
    <div className="bg-[#fff7f2] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {/* ✅ Logo Added */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-22 w-25" />
          {/* 🔥 Made the logo bigger like login */}
        </div>

        <h2 className="font-bold text-2xl mb-6 text-center text-orange-600">
          Register To SCREENLY
        </h2>

        <Form
          layout="vertical"
          onFinish={submitForm} // when you click signup the values will automatically be stored and send to the specified function as parameter
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <div className="hover:ring-2 hover:ring-orange-300 focus-within:ring-2 focus-within:ring-orange-500 rounded transition duration-200">
              <Input className="!bg-orange-50 !border-none !shadow-none !text-black" />
            </div>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <div className="hover:ring-2 hover:ring-orange-300 focus-within:ring-2 focus-within:ring-orange-500 rounded transition duration-200">
              <Input className="!bg-orange-50 !border-none !shadow-none !text-black" />
            </div>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <div className="hover:ring-2 hover:ring-orange-300 focus-within:ring-2 focus-within:ring-orange-500 rounded transition duration-200">
              <Input.Password className="!bg-orange-50 !border-none !shadow-none !text-black" />
            </div>
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-orange-500 hover:bg-orange-600 border-none"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <p>
            Already a user ?{" "}
            <Link to="/login" className="text-orange-500 hover:underline">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
