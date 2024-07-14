/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Store from "../mainComponents/Store";
import Navbar from "./Navbar";
export default function Dashboard() {
  const [count, setCount] = useState(0);
  const [balance, setBalance] = useState(null);
  const [paymentData, setPaymentData] = useState("");
  const [approve, setApprove] = useState(0);
  const [pending, setPending] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const { admin } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
  const fetchServicesData = async () => {
    try {
      const response = await fetch("http://localhost:8000/totalServices");
      const json = await response.json();
      setCount(json);
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
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBalanceData();
    fetchServicesData();
    fetchPaymentRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (paymentData) {
      let approvedCount = 0;
      let pendingCount = 0;
      paymentData.forEach((payment) => {
        if (payment.flag) {
          approvedCount++;
        } else {
          pendingCount++;
        }
      });
      setApprove(approvedCount);
      setPending(pendingCount);
    }
  }, [paymentData]);
  return (
    <div>
      <Navbar />
      <div className='container-fluid bodySetting'>
        {loading && <p>Loading...</p>}
        <div className='row'>
          <main className='col-xl-12 ms-sm-auto col-lg-12 px-md-4'>
            <div className='container'>
              <div className='row mt-4'>
                <div className='col-12 col-sm-12 col-xl-6'>
                  <div className='card l-bg-cherry'>
                    <div className='card-statistic-3 p-4'>
                      <div className='card-icon card-icon-large'>
                        <i className='fas fa-shopping-cart'></i>
                      </div>
                      <div className='mb-4'>
                        <h5 className='card-title mb-0 fw-bold'>Earning</h5>
                      </div>
                      <div className='row align-items-center mb-2 d-flex'>
                        <div className='col-8'>
                          {balance ? (
                            <h2 className='d-flex align-items-center mb-0'>
                              ${balance.available[0].amount / 100}
                              {/* {balance.available[0].currency.toUpperCase()} */}
                            </h2>
                          ) : (
                            <h2 className='d-flex align-items-center mb-0'>
                              Loading balance...
                            </h2>
                          )}
                        </div>
                        <div className='col-4 text-right'>
                          <span>
                            12.5% <i className='fa fa-arrow-up'></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12 col-sm-12 col-xl-6 '>
                  <div className='card l-bg-blue-dark'>
                    <div className='card-statistic-3 p-4'>
                      <div className='card-icon card-icon-large'>
                        <i className='fas fa-users'></i>
                      </div>
                      <div className='mb-4'>
                        <h5 className='card-title mb-0 fw-bold'>
                          Total Services
                        </h5>
                      </div>
                      <div className='row align-items-center mb-2 d-flex'>
                        <div className='col-8'>
                          <h2 className='d-flex align-items-center mb-0'>
                            {count ? count : "0"}
                          </h2>
                        </div>
                        <div className='col-4 text-right'>
                          <span>
                            15.07k <i className='fa fa-arrow-up'></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12 col-sm-12 col-xl-6'>
                  <div className='card l-bg-green-dark'>
                    <div className='card-statistic-3 p-4'>
                      <div className='card-icon card-icon-large'>
                        <i className='fas fa-ticket-alt'></i>
                      </div>
                      <div className='mb-4'>
                        <h5 className='card-title mb-0 fw-bold'>Approved</h5>
                      </div>
                      <div className='row align-items-center mb-2 d-flex'>
                        <div className='col-8'>
                          <h2 className='d-flex align-items-center mb-0'>
                            {approve}
                          </h2>
                        </div>
                        <div className='col-4 text-right'>
                          <span>
                            10% <i className='fa fa-arrow-up'></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12 col-sm-12 col-xl-6'>
                  <div className='card l-bg-orange-dark'>
                    <div className='card-statistic-3 p-4'>
                      <div className='card-icon card-icon-large'>
                        <i className='fas fa-dollar-sign'></i>
                      </div>
                      <div className='mb-4'>
                        <h5 className='card-title mb-0 fw-bold'> Pending</h5>
                      </div>
                      <div className='row align-items-center mb-2 d-flex'>
                        <div className='col-8'>
                          <h2 className='d-flex align-items-center mb-0'>
                            {" "}
                            {pending}
                          </h2>
                        </div>
                        <div className='col-4 text-right'>
                          <span>
                            2.5% <i className='fa fa-arrow-up'></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
