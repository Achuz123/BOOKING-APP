import React from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../apicalls/users.jsx";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice.jsx";
import { useEffect } from "react";
import logo from "../../favicon/orange-logo.png"; //

function login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // CODE TO CHECK THE PASSWORD AND SEND THE VALUES
  const submitForm = async (value) => {
    try {
      // calling the login user function from the axios and storing the response
      const res = await LoginUser(value);

      // with the response we also get the JWT token we will save that in local storage
      localStorage.setItem("token", res.token);

      dispatch(setUser(res.user)); // calling the slice and giving the user information as payload

      // to display the response message on screen
      if (res.success) {
        message.success(res.message);
        // Will redirect to homepage when logged
        window.location.href = "/";
      } else message.error(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  // if you have a token then you won't be allowed to go to login page you'll go to home directly
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);

  // HTML CODE FOR THE PAGE
  return (
    <div className="bg-[#fff7f2] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {/* ✅ Logo Added */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-22 w-25" />
          {/* 🔥 Made the logo bigger from h-16 to h-20 */}
        </div>

        <h2 className="font-bold text-2xl mb-6 text-center text-orange-600">
          Login To SCREENLY
        </h2>

        <Form
          layout="vertical"
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={submitForm}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
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
            New User ?{" "}
            <Link to="/register" className="text-orange-500 hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default login;
