import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapWithMarker from "./MapWithMarker";

const SingleReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [hoveredDiv, setHoveredDiv] = useState(null); // State to track which div is hovered

  useEffect(() => {
    axios.get(`https://node-complaint-server.onrender.com/singleReport/${id}`)
      .then(response => {
        setReport(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching report details:", error);
      });
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const getCardClasses = (divId) => {
    return hoveredDiv === divId 
      ? "bg-gray-200 rounded-lg shadow-custom transform scale-105 transition-transform duration-300 m-3 p-2 min-h-[30rem] min-w-[22rem] flex-auto"
      : "bg-gray-200 rounded-lg shadow-lg transform scale-95 transition-transform duration-300 m-3 p-2 min-h-[30rem] min-w-[22rem] flex-auto";
  };
;
  return (
    <div className="m-0 py-0  min-h-screen bg-gray-100">
  <nav className="w-full h-16 bg-teal-500 flex items-center justify-between px-8">
        <h1 className="text-white text-xl">Complaint-System</h1>
        <button
          className="border-none outline-none py-3 px-5 bg-white text-teal-500 rounded-full font-bold text-sm cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <div className="flex place-items-center justify-center bg-gray-100  p-2">
        <div className="min-h-24 min-w-20 bg-gray-100 place-items-baseline">
          {report ? (
            <div
              className={`${getCardClasses('report')} max-w-[25rem] overflow-clip p-4`}
              onMouseEnter={() => setHoveredDiv('report')}
              onMouseLeave={() => setHoveredDiv(null)}

            >
              <h2 className="mb-5 text-lg font-bold"> Report Details </h2>
              <div className="text-gray-800">
                <p className="mb-2"><strong>ID: </strong>{report._id}</p>
                <p className="mb-2"><strong>Category :</strong>{report.Category}</p>
                <p className="mb-2"><strong>Address :</strong> {report.Address}</p>
                <p className="mb-2"><strong>Description :</strong>{report.Description}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Images card */}
        <div >
          <div
            
            className={`${getCardClasses('images')} max-w-[25rem] max-h-[27rem] overflow-clip p-0`}
            onMouseEnter={() => setHoveredDiv('images')}
            onMouseLeave={() => setHoveredDiv(null)}
          >
            <h2 className="mb-5 text-lg font-bold">Images</h2>
            {report && report.Images.map((image, index) => (
              <img
                key={index}
                
               src={`${image}`}
              
             //   src={`http://192.168.0.103:8000/${report.images}`}
                alt={`${index + 1}`}
                className="max-w-[26rem] max-h-[34rem] mb-3"
                onError={(e) => console.error(`Error loading image:`, e)
                }
              />
            
            ))}
          </div>
        </div>

        {/* Map card */}
        <div>
          {report ? (
            <div
              className={`${getCardClasses('map')} max-size-[27rem]  overflow-clip p-0 `}
              onMouseEnter={() => setHoveredDiv('map')}
              onMouseLeave={() => setHoveredDiv(null)}
            >
              <h2 className="mb-5 text-lg font-bold">Map</h2>
              <MapWithMarker latitude={parseFloat(report.Latitude)} longitude={parseFloat(report.Longitude)} />
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleReport;

