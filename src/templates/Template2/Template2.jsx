import React from "react";
import "./Template2.css";

const Template2 = ({ data }) => {
  // ===== Currency formatter =====
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount || 0);
  };

  // ===== Calculations (FIXED) =====
  const subtotal =
    data?.items?.reduce(
      (acc, item) => acc + Number(item.qty || 0) * Number(item.amount || 0),
      0
    ) || 0;

  const taxAmount = (subtotal * (data?.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  return (
    <div className="template2 container border p-4 mt-4 template2-wrapper">
      {/* ===== Header ===== */}
      <div className="d-flex justify-content-between align-items-start">
        <h2>Invoice</h2>

        <div className="text-end w-50">
          {data?.companyLogo && (
            <div className="mb-2">
              <img src={data.companyLogo} alt="Company Logo" width={98} />
            </div>
          )}
          <h6 className="company-title">{data?.companyName}</h6>
          <p className="mb-0">{data?.companyAddress}</p>
          <p className="mb-0">{data?.companyPhone}</p>
        </div>
      </div>

      {/* ===== Client & Invoice Info ===== */}
      <div className="row mt-4">
        <div className="col-md-6">
          <h6>Billed To</h6>
          <p className="mb-0 fw-bold">{data?.billingName}</p>
          <p className="mb-0">{data?.billingAddress}</p>
          <p className="mb-0">{data?.billingPhone}</p>
        </div>

        <div className="col-md-6 text-md-end">
          <h6>Invoice Details</h6>
          <p className="mb-0">
            <strong>Invoice #:</strong> {data?.invoiceNumber}
          </p>
          <p className="mb-0">
            <strong>Invoice Date:</strong> {data?.invoiceDate}
          </p>
          <p className="mb-0">
            <strong>Due Date:</strong> {data?.paymentDate}
          </p>
        </div>
      </div>

      {/* ===== Items Table ===== */}
      <div className="table-responsive mt-4">
        <table className="table table-bordered" aria-label="Invoice Items Table">
          <thead>
            <tr>
              <th className="template2-table-header">Item # / Description</th>
              <th className="template2-table-header text-center">Qty</th>
              <th className="template2-table-header text-end">Rate</th>
              <th className="template2-table-header text-end">Amount</th>
            </tr>
          </thead>

          <tbody>
            {data?.items?.map((item, index) => (
              <tr key={index}>
                <td className="p-3">
                  <div className="fw-bold">{index + 1}. {item.name}</div>
                  <div className="text-muted">{item.description}</div>
                </td>
                <td className="text-center">{item.qty}</td>
                <td className="text-end">
                  {formatCurrency(item.amount)}
                </td>
                <td className="text-end">
                  {formatCurrency(item.qty * item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Summary ===== */}
      <div className="d-flex justify-content-end mt-3">
        <div className="text-end">
          <p className="mb-1">
            <strong>Sub Total:</strong> {formatCurrency(subtotal)}
          </p>

          {data?.tax > 0 && (
            <p className="mb-1">
              <strong>Tax ({data.tax}%):</strong>{" "}
              {formatCurrency(taxAmount)}
            </p>
          )}

          <p className="fs-5 fw-bold">
            Total Due: {formatCurrency(total)}
          </p>
        </div>
      </div>

      {/* ===== Bank Details ===== */}
      {(data?.accountName ||
        data?.accountNumber ||
        data?.accountIfscCode) && (
        <div className="mt-4">
          <h6>Bank Account Details</h6>
          {data.accountName && (
            <p className="mb-1">
              <strong>Account Holder:</strong> {data.accountName}
            </p>
          )}
          {data.accountNumber && (
            <p className="mb-1">
              <strong>Account Number:</strong> {data.accountNumber}
            </p>
          )}
          {data.accountIfscCode && (
            <p className="mb-0">
              <strong>IFSC / Branch Code:</strong>{" "}
              {data.accountIfscCode}
            </p>
          )}
        </div>
      )}

      {/* ===== Notes ===== */}
      {data?.notes && (
        <div className="mt-4 notes-section">
          <h6>Remarks:</h6>
          <p className="mb-0">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export default Template2;
