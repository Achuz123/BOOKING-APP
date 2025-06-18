import React from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import { Link } from "react-router-dom";
import { LoginUser } from "../apicalls/users.jsx";

function login() {
  //CODE TO CHECK THE PASSWRD AND SEND THE VALUES
  const submitForm = async (value) => {
    try {
      //calling the login user function from the axios ans storing the response
      const res = await LoginUser(value);

      //with the response we alo get the JWT token we will save that in local storage

      localStorage.setItem("token", res.token);

      // to display the response message on screen
      if (res.success) {
        message.success(res.message);
        //Will redirect to homepage when logged in
        window.location.href = "/";
      } else message.error(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  //HTML CODE FOR THE PAGE
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
            onFinish={submitForm}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
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
