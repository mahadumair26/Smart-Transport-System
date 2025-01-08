import React, { useState } from "react";
import {Footer} from "../components";

const PaymentPage = () => {
  const [feeDetails, setFeeDetails] = useState({
    monthlyFee: 3000,
    dueDate: "2025-01-15",
    status: "Pending",
  });
  const [receipt, setReceipt] = useState(null);
  const [alert, setAlert] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setReceipt(file);
    setAlert("Receipt uploaded successfully!");
  };

  const handlePaymentSubmit = () => {
    if (receipt) {
      setFeeDetails({ ...feeDetails, status: "Paid" });
      setAlert("Payment submitted successfully!");
    } else {
      setAlert("Please upload a receipt before submitting.");
    }
  };

  return (
    <>
     
      <div className="container my-3 py-3">
        <h1 className="text-center">Payment Page</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Monthly Fee Details</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Monthly Fee
                    <span>${feeDetails.monthlyFee}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Due Date
                    <span>{feeDetails.dueDate}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Payment Status
                    <span className={feeDetails.status === "Paid" ? "text-success" : "text-danger"}>
                      {feeDetails.status}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3 bg-light">
                <h5 className="mb-0">Make a Payment</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label" htmlFor="receiptUpload">
                    Upload Receipt
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="receiptUpload"
                    onChange={handleFileUpload}
                  />
                </div>
                {alert && <p className="alert alert-info">{alert}</p>}
                <button
                  className="btn btn-dark btn-lg btn-block"
                  onClick={handlePaymentSubmit}
                >
                  Submit Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentPage;
