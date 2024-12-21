import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://node-complaint-server.onrender.com/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="flex shadow-md rounded-lg p-8 bg-white">
        <div className="w-full p-8 md:w-1/2 flex flex-col items-center">
          <form className="w-full flex flex-col space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4">Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="p-2 border border-gray-300 bg-gray-200 rounded placeholder:bg-gray-200 focus:bg-gray-30i0"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="p-2 border border-gray-300 bg-gray-200 rounded placeholder:bg-gray-200 focus:bg-gray-300"
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600">
              Sign In
            </button>
          </form>
        </div>
        <div className="w-full p-8 md:w-1/2 bg-teal-500 flex flex-col items-center justify-center rounded-r-lg">
          <h1 className="text-white text-2xl font-bold mb-4">Forgotten Password ?</h1>
          <Link to="/signup">
            <button type="button" className="bg-white text-teal-500 p-2 rounded hover:bg-gray-100">
            Setup Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

