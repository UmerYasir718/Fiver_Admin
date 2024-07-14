/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../mainComponents/Navbar";
import Store from "../mainComponents/Store";
export default function Service() {
  const [data, setData] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const { admin } = useContext(Store);
  const handleDetail = (data) => {
    setSelectedService(data);
  };
  const fetchServiceData = async () => {
    try {
      const response = await fetch("http://localhost:8000/getService");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   alert(error);
    }
  };
  const handleDelete = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:8000/deleteService/${data}`,
        {
          method: "DELETE",
        }
      );

      const jsonData = await response.json();

      if (jsonData.error) {
        console.error("Error deleting item:", jsonData.error);
      } else {
        // Item deleted successfully, update state
        alert(jsonData.message);
        fetchServiceData();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  useEffect(() => {
    fetchServiceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />

      <div className='container-fluid'>
        {" "}
        <div className='row'>
          <h1 className='text-primary fw-bold text-decoration-underline mb-3'>
            Manage Service
          </h1>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 mb-3'>
            <table className='table table-dark table-bordered border-light'>
              <thead>
                <tr>
                  {/* <th scope='col'>No.</th> */}
                  <th scope='col'>Service Provider</th>
                  <th scope='col'>Service Name</th>
                  <th scope='col'>Service Type</th>
                  <th scope='col'>Detail</th>
                  <th scope='col'>Delete</th>
                </tr>
              </thead>
              {Array.isArray(data) ? (
                data
                  .filter((data) => data.adminName === admin.adminName)
                  .map((data, index) => (
                    <tbody className='table-group-divider'>
                      <tr key={data._id}>
                        {/* <th scope='row'>{count + index}</th> */}
                        <td> {data.ownerName}</td>
                        <td> {data.serviceName}</td>
                        <td>
                          {" "}
                          {data.serviceType == "1"
                            ? "Web Development"
                            : data.serviceType == "2"
                            ? "Content Writing"
                            : data.serviceType == "3"
                            ? "Logo Design"
                            : data.serviceType == "4"
                            ? "Guest Post"
                            : "Nothing"}
                        </td>
                        <td>
                          <button
                            className='btn btn-primary text-light fw-bold  btn-sm'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal'
                            onClick={() => handleDetail(data)}
                          >
                            Detail
                          </button>
                        </td>
                        <td>
                          <button
                            className='btn btn-danger text-light fw-bold btn-sm'
                            onClick={() => handleDelete(data._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))
              ) : (
                <tbody>
                  <tr>
                    <td colspan='5'>No Data Found</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      {/* <!-- Modal Detail --> */}
      <div
        className='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Modal title
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {" "}
              <div className='CountryForm'>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Service Name
                  </label>
                  <p className='modalInformation'>
                    {" "}
                    {selectedService ? selectedService.serviceName : ""}
                  </p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Service Price
                  </label>
                  <p className='modalInformation'>
                    {" "}
                    {selectedService ? selectedService.servicePrice : ""}
                  </p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Service Contact
                  </label>
                  <p className='modalInformation'>
                    {" "}
                    {selectedService ? selectedService.serviceContact : ""}
                  </p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Description
                  </label>
                  <br />
                  <textarea
                    className='form-control'
                    id='exampleFormControlTextarea1'
                    // className='modalInformation'
                    rows='3'
                    value={
                      selectedService ? selectedService.serviceDescription : ""
                    }
                  ></textarea>
                </div>
                <label for='example' className='form-label'>
                  Select Service Type
                </label>
                <p className='modalInformation'>
                  {" "}
                  {selectedService ? selectedService.serviceType : ""}
                </p>
                <label for='exampleImage' className='form-label'>
                  Image
                </label>
                <div className='input-group mb-3'>
                  {" "}
                  <Link
                    className=' text-dark modalInformation'
                    to={selectedService ? selectedService.image : ""}
                    target='_blank'
                  >
                    Image
                  </Link>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal Detail --> */}
    </>
  );
}
