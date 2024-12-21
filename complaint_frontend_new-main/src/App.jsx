import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup"; // Corrected typo from "Singup" to "Signup"
import Login from "./components/Login";
import SingleReport from "./components/SingleReport";

function App() {
    const user = localStorage.getItem("token");

    return (
        <Routes>
            {user ? ( // Check if user is logged in
                <Route path="/" element={<Main />} /> // Render Main component if logged in
            ) : (
                <Route path="/" element={<Navigate replace to="/login" />} /> // Redirect to login if not logged in
            )}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singleReport/:id" element={<SingleReport />} /> {/* Corrected from 'component' to 'element' */}
        </Routes>
    );
}

export default App;

