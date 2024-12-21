import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://node-complaint-server.onrender.com/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-4/5 md:w-3/4 lg:w-1/2 xl:w-2/5 h-auto flex rounded-lg shadow-md bg-white">
        <div className="flex-1 flex flex-col items-center justify-center bg-teal-500 rounded-l-lg p-4">
          <h1 className="text-white text-3xl">Welcome Back</h1>
          <Link to="/login">
            <button 
              type="button" 
              className="bg-white text-teal-500 mt-4 px-6 py-2 rounded-full font-bold">
              Sign in
            </button>
          </Link>
        </div>
        <div className="flex-2 flex flex-col items-center justify-center bg-white rounded-r-lg p-4">
          <form className="flex flex-col items-center space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-4xl mb-4">Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="outline-none border border-gray-300 w-full max-w-xs p-3 rounded-lg bg-gray-200 text-base"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="outline-none border border-gray-300 w-full max-w-xs p-3 rounded-lg bg-gray-200 text-base"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="outline-none border border-gray-300 w-full max-w-xs p-3 rounded-lg bg-gray-200 text-base"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="outline-none border border-gray-300 w-full max-w-xs p-3 rounded-lg bg-gray-200 text-base"
            />
            {error && <div className="w-full max-w-xs p-3 rounded-lg bg-red-500 text-white text-center">{error}</div>}
            <button 
              type="submit" 
              className="bg-teal-500 text-white w-full max-w-xs py-2 rounded-full font-bold mt-2">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

