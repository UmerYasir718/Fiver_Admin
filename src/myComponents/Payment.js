/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../mainComponents/Navbar";
import Store from "../mainComponents/Store";
export default function Payment() {
  const [cardData, setCardData] = useState("");
  const [paymentData, setPaymentData] = useState("");
  const [transactionHistory, setTransactionHistory] = useState("");
  const [balance, setBalance] = useState(null);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [flag, setFlag] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [count] = useState(1);
  const { admin } = useContext(Store);
  const handleUpdate = (payment) => {
    setSelectedUpdate(payment);
    setOwnerName(payment.ownerName);
    setServiceName(payment.serviceName);
    setServicePrice(payment.servicePrice);
    setTimestamp(payment.timestamp);
    setFlag(payment.flag);
  };
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/getPayment");
      const json = await response.json();
      setCardData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error);
    }
  };
  const fetchBalanceData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/balance");
      const json = await response.json();
      setBalance(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   alert(error);
    }
  };
  const fetchPaymentRecord = async () => {
    try {
      const response = await fetch("http://localhost:8000/getPaymentRecord");
      const json = await response.json();
      setPaymentData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error);
    }
  };
  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/transactions");
      const json = await response.json();
      setTransactionHistory(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error);
    }
  };
  const handleUpdateSubmit = async () => {
    const updatedFormData = {
      ownerName,
      serviceName,
      servicePrice,
      flag,
      timestamp,
    };
    console.log("Updated FormData:", updatedFormData);

    try {
      const response = await fetch(
        `http://localhost:8000/updatePaymentStatus/${selectedUpdate._id}`,
        {
          method: "PUT", // Use PUT for updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (response.ok) {
        alert("Item updated successfully!");
        fetchPaymentRecord(); // Refresh the data after the update
        // setServiceName("");
        // setServicePrice("");
        // setFlag("");
        // setTimestamp("");
        // setOwnerName("")
      } else {
        console.error("Failed to update item:", response.statusText);
        alert(response.statusText);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBalanceData()
    fetchPaymentRecord();
    fetchPaymentHistory();
  }, []);
  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 mb-3'>
            {/* -----------------------------------------------------------------------------------Balance -------------------------------------------------------------------- */}
            <div class='alert alert-success my-4 d-flex flex-row justify-content-between' role='alert'>
              <h3 className="d-flex flex-row justify-content-center align-items-center fw-bold">Available Balance</h3>
              {balance ? (
                <h3 className="d-flex flex-row justify-content-center align-items-center fw-bold">
                  ${balance.available[0].amount / 100}
                  {/* {balance.available[0].currency.toUpperCase()} */}
                </h3>
              ) : (
                <h3 className="d-flex flex-row justify-content-center align-items-center fw-bold">
                  Loading balance...
                </h3>
              )}
            </div>
            <div class='alert alert-primary my-4 d-flex flex-row justify-content-between' role='alert'>
              <h3 className="d-flex flex-row justify-content-center align-items-center fw-bold">Pending Balance</h3>
              {balance ? (
                <h3 className="d-flex flex-row justify-content-center align-items-center fw-bold">
                  ${balance.pending[0].amount / 100}
                  {/* {balance.available[0].currency.toUpperCase()} */}
                </h3>
              ) : (
                <h3 className="d-flex flex-row justify-content-center align-items-center fw-bold">
                  Loading balance...
                </h3>
              )}
            </div>
            {/* --------------------------------------------------------------------------------Transaction History-------------------------------------------------------------------- */}
            <h1 className='text-primary fw-bold text-decoration-underline mb-3'>
              Manage Transaction
            </h1>
            <table className='table table-dark table-bordered border-light p-3'>
              <thead>
                <tr>
                  <th scope='col'>Transaction ID</th>
                  <th scope='col'>Transaction Amount</th>
                </tr>
              </thead>
              {transactionHistory.length > 0 ? (
                <tbody className='table-group-divider '>
                  {transactionHistory.map(transaction => (
                    <tr key={transaction.id}>
                      <td>{new Date(transaction.created * 1000).toLocaleString()}</td>
                      <td> {transaction.amount / 100} {transaction.currency.toUpperCase()}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colspan='5'>No History Found</td>
                  </tr>
                </tbody>
              )}
            </table>
            {/* --------------------------------------------------------------------------------Cards Data-------------------------------------------------------------------- */}
            <h1 className='text-primary fw-bold text-decoration-underline mb-3'>
              Manage Payments Methods
            </h1>
            <table className='table table-dark table-bordered border-light p-3'>
              <thead>
                <tr>
                  <th scope='col'>Card Holder Name</th>
                  <th scope='col'>Card Number</th>
                </tr>
              </thead>

              {Array.isArray(cardData) ? (
                cardData.map((card, index) => (
                  <tbody className='table-group-divider '>
                    <tr key={card._id}>
                      <td> {card.cardName}</td>
                      <td>{card.cardNumber}</td>
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
            {/* -------------------------------------------------------------------------------Payments Record-------------------------------------------------------------------- */}
            <h1 className='text-primary fw-bold text-decoration-underline mb-3'>
              Pending Payments
            </h1>
            <table className='table table-dark table-bordered border-light p-3'>
              <thead>
                <tr>
                  <th scope='col'>No.</th>
                  <th scope='col'>Transaction ID</th>
                  <th scope='col'>Service Provider</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Status</th>
                </tr>
              </thead>

              {Array.isArray(paymentData) ? (
                paymentData.map((payment, index) => (
                  <tbody className='table-group-divider '>
                    <tr key={payment._id}>
                      <th scope='row'>{count + index}</th>
                      <td>{new Date(payment.timestamp).toLocaleString()}</td>
                      <td> {payment.ownerName}</td>
                      <td>{payment.servicePrice}</td>
                      <td>
                        {payment.flag === true ? (
                          <button className='btn btn-success text-light fw-bold disable btn-sm'>
                            Approved
                          </button>
                        ) : (
                          <button className='btn btn-danger text-light fw-bold  btn-sm' data-bs-toggle='modal' data-bs-target='#updateModel' onClick={() => { handleUpdate(payment) }}>
                            Pending
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tbody>
                  <tr>
                    <td colspan='4'>No Payment Found</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        {/* <!-- Modal Update --> */}
        <div
          className='modal fade'
          id='updateModel'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                  Update
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
                      Service Provider
                    </label>
                    <p className='modalInformation'>
                      {ownerName}
                    </p>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='handleCountryName' className='form-label'>
                      Service Name
                    </label>
                    <p className='modalInformation'>
                      {serviceName}
                    </p>
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='handleCountryName' className='form-label'>
                      Service Price
                    </label>
                    <p className='modalInformation'>
                      {servicePrice}
                    </p>
                  </div>
                  <label for='example' className='form-label'>
                    Select Service Type
                  </label>
                  <select
                    className='form-select mb-3'
                    aria-label='Default select example'
                    onChange={(event) => setFlag(event.target.value)}
                  >
                    <option selected>Select Service Type</option>
                    <option value='true'>Approved</option>
                    <option value='false'>Pending</option>
                  </select>
                  {/* <div className='mb-3'>
                    <label htmlFor='handleCountryName' className='form-label'>
                      Payment
                    </label>
                    <p className='modalInformation'>
                      {flag ? "Approved" : "Pending"}
                    </p>
                  </div> */}
                  <div className='mb-3'>
                    <label htmlFor='handleCountryName' className='form-label'>
                      Time Stamp
                    </label>
                    <p className='modalInformation'>
                      {new Date(timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  type='submit'
                  className='btn btn-primary d-flex justify-content-center align-content-center m-auto my-3'
                  onClick={handleUpdateSubmit}
                >
                  Approve Payment
                </button>
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
        {/* <!-- Modal Update--> */}
      </div>
    </div>
  );
}
