import React from "react";
import "./Template6.css";

const Template6 = ({ data }) => {
  const subtotal =
    data.items.reduce(
      (acc, item) => acc + item.qty * item.amount,
      0
    ) || 0;

  const taxAmount = (subtotal * (data.tax || 0)) / 100;
  const total = subtotal + taxAmount;

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="template6-container mx-auto my-4">
      {/* ===== Header ===== */}
      <div className="template6-header">
        <div>
          <h1 className="mb-1 invoice-title">Invoice</h1>
          <p><strong>Invoice #:</strong> {data.invoiceNumber}</p>
          <p><strong>Date:</strong> {formatDate(data.invoiceDate)}</p>
          <p><strong>Due:</strong> {formatDate(data.paymentDate)}</p>
        </div>

        <div className="text-end">
          {data.companyLogo && (
            <img
              src={data.companyLogo}
              alt="Company Logo"
              className="template6-logo"
            />
          )}
          <h4 className="template6-company">{data.companyName}</h4>
          <p>{data.companyAddress}</p>
          <p>{data.companyPhone}</p>
        </div>
      </div>

      {/* ===== Billing ===== */}
      <div className="template6-billing">
        <div>
          <h6>Billed To</h6>
          <p>{data.billingName}</p>
          <p>{data.billingAddress}</p>
          <p>{data.billingPhone}</p>
        </div>

        {data.shippingName && (
          <div>
            <h6>Shipped To</h6>
            <p>{data.shippingName}</p>
            <p>{data.shippingAddress}</p>
            <p>{data.shippingPhone}</p>
          </div>
        )}
      </div>

      {/* ===== Items ===== */}
      <div className="template6-table-wrapper">
        <table className="template6-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th className="text-center">Qty</th>
              <th className="text-end">Rate</th>
              <th className="text-end">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <strong>{item.name}</strong>
                  {item.description && (
                    <div className="text-muted small">
                      {item.description}
                    </div>
                  )}
                </td>
                <td className="text-center">{item.qty}</td>
                <td className="text-end">
                  {data.currencySymbol}{item.amount.toFixed(2)}
                </td>
                <td className="text-end">
                  {data.currencySymbol}{(item.qty * item.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Totals ===== */}
      <div className="template6-totals">
        <div>
          <span>Subtotal</span>
          <span>{data.currencySymbol}{subtotal.toFixed(2)}</span>
        </div>
        <div>
          <span>Tax ({data.tax}%)</span>
          <span>{data.currencySymbol}{taxAmount.toFixed(2)}</span>
        </div>
        <div className="template6-grand-total">
          <span>Total</span>
          <span>{data.currencySymbol}{total.toFixed(2)}</span>
        </div>
      </div>

      {/* ===== Bank ===== */}
      {(data.accountName || data.accountNumber || data.accountIfscCode) && (
        <div className="template6-bank">
          <h6>Bank Details</h6>
          {data.accountName && <p><strong>Name:</strong> {data.accountName}</p>}
          {data.accountNumber && <p><strong>Account:</strong> {data.accountNumber}</p>}
          {data.accountIfscCode && <p><strong>IFSC:</strong> {data.accountIfscCode}</p>}
        </div>
      )}

      {/* ===== Notes ===== */}
      {data.notes && (
        <div className="template6-notes">
          <h6>Remarks:</h6>
          <p>{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export default Template6;
