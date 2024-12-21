import  { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import axios from "axios";

const Main = () => {
  const [allReports, setComplaints] = useState([]);
 // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//  const toggleDropdown = () => { setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    axios.get("https://node-complaint-server.onrender.com/getReports")
      .then(response => {
        setComplaints(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleStatusChange = (reportId, newStatus) => {
    // Update status locally
    setComplaints(prevReports => prevReports.map(report => {
      if (report._id === reportId) {
        return { ...report, Status: newStatus };
      }
      return report;
    }));

    // Update status on backend
    axios.put(`https://node-complaint-server.onrender.com/updateStatus/${reportId}`, { status: newStatus })
      .then(response => {
        console.log("Status updated successfully:", response.data);
      })
      .catch(error => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-200 px-4 ">
      <nav className="w-full h-16 bg-teal-500 flex items-center justify-between px-8 rounded">
        <h1 className="text-white text-xl font-bold">Complaint-System</h1>
        <button 
          className="border-none outline-none py-3 px-5 bg-white text-teal-500 rounded-full font-bold text-sm cursor-pointer hover:bg-gray-100" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <div className="mt-8">
        <table className="w-3/5 border-collapse mx-auto bg-white shadow-xl rounded-lg">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-300">ID</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-300">Category</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-300">Status</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {allReports.map(report => (
              <tr key={report._id} className="transform transition-transform duration-200 hover:scale-105 hover:shadow-custom ">
                <td className="border border-gray-300 px-4 py-2">{report._id}</td>
                <td className="border border-gray-300 px-4 py-2">{report.Category}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select 
                    value={report.Status} 
                    onChange={(e) => handleStatusChange(report._id, e.target.value)}
                    className="border-none outline-none bg-gray-200"
                  >
                    <option value="pending" className="bg-red-500 hover:bg-black">Pending</option>
                    <option value="in progress"className="bg-yellow-500">In Progress</option>
                    <option value="completed"className="bg-green-500">Completed</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link to={`/singleReport/${report._id}`}>
                    <button className="bg-teal-500 text-white rounded py-1 px-3 hover:bg-teal-600">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;

