import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "../myComponents/Payment";
import Service from "../myComponents/Service";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Store from "./Store";
export default function MainRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [admin, setAdmin] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(["adminToken"]);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:8000/adminVerify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.adminToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
          setAdmin(data.adminData.adminData);
        } else {
          const errorData = await response.json();
          if (!location.pathname.startsWith("/AdminReset-Password")) {
            navigate("/");
          }
          toast.error(errorData.message);
          // console.error("Token verification failed:", errorData.message);
          // Redirect to login or handle unauthorized access
        }
      } catch (error) {
        console.error("Token verification failed:", error.message);
        // Redirect to login or handle unauthorized access
      }
    };
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Store.Provider value={{ admin, setAdmin }}>
        {/* <Router basename='/'> */}
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/user' element={<Dashboard />}></Route>
          <Route exact path='/show' element={<Service />}></Route>
          <Route exact path='/pay' element={<Payment />}></Route>
        </Routes>
        {/* </Router> */}
      </Store.Provider>
    </div>
  );
}
