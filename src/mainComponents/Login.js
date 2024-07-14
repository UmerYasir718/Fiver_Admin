import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./Store";
export default function Login() {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const { setAdmin } = useContext(Store);
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(["adminToken"]);
  const [loading, setLoading] = useState(false);
  const handleEmailChange = (e) => {
    setAdminEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setAdminPassword(e.target.value);
  };
  const handleLogin = async () => {
    console.log(adminEmail, adminPassword);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminEmail, adminPassword }),
      });

      const data = await response.json();

      if (data.success) {
        // Login successful, you can handle the success scenario here
        console.log("Login successful:", data);
        setCookie("adminToken", data.adminToken);
        setAdmin(data.adminData);
        navigate("/user");
        toast.success(data.message);
        // setAdmin(data.admin);
        console.log(data.adminData);
      } else {
        // Login failed, handle the error scenario
        console.error("Login failed:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <section>
        <div className='form_data'>
          {loading && <p className='text-success fw-bold'>Loading...</p>}
          <div className='form_heading'>
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>

          <div className='form'>
            <div className='form_input'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                value={adminEmail}
                onChange={handleEmailChange}
                name='email'
                id='email'
                placeholder='Enter Your Email Address'
              />
            </div>
            <div className='form_input'>
              <label htmlFor='password'>Password</label>
              <div className='two'>
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={handlePasswordChange}
                  value={adminPassword}
                  name='password'
                  id='password'
                  placeholder='Enter Your password'
                />
                <div
                  className='showpass'
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className='btn' onClick={handleLogin}>
              Login
            </button>
            <div className='d-flex flex-row  gap-2 my-3'>
              <Link className='text-primary' to=''>
                Contact Super Admin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
