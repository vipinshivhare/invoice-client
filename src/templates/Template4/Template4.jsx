import React from 'react';
import './Template4.css';

const Template4 = ({ data }) => {
    const subtotal = data.items.reduce((acc, item) => acc + item.qty * item.amount, 0);
    const taxAmount = (subtotal * parseFloat(data.tax || 0)) / 100;
    const total = subtotal + taxAmount;

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className="template4 border rounded mx-auto my-4 p-4">
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
                <div className="w-50">
                    {data.companyLogo && (
                        <div className="mb-2">
                            <img
                                src={data.companyLogo}
                                alt="Company Logo"
                                width={98}
                            />
                        </div>
                    )}
                    <h4 className="template4-company-name">{data.companyName}</h4>
                    <p className="mb-1">{data.companyAddress}</p>
                    <p className="mb-0">{data.companyPhone}</p>
                </div>
                <div className="text-md-end w-50">
                    <h5 className="template4-title template4-primary-color">Invoice</h5>
                    <p className="mb-1"><strong>Invoice No:</strong> {data.invoiceNumber}</p>
                    <p className="mb-1"><strong>Invoice Date:</strong> {formatDate(data.invoiceDate)}</p>
                    <p className="mb-0"><strong>Due Date:</strong> {formatDate(data.paymentDate)}</p>
                </div>
            </div>

            {/* Billing */}
            <div className="template4-billing">
            <div className="template4-bill-card">
                <h6 className="template4-primary-color">Billed To</h6>
                <p className="fw-semibold mb-1">{data.billingName}</p>
                <p className="mb-1">{data.billingAddress}</p>
                <p className="mb-0">{data.billingPhone}</p>
            </div>

            {data.shippingName && (
                <div className="template4-bill-card">
                <h6 className="template4-primary-color">Shipped To</h6>
                <p className="fw-semibold mb-1">{data.shippingName}</p>
                <p className="mb-1">{data.shippingAddress}</p>
                <p className="mb-0">{data.shippingPhone}</p>
                </div>
            )}
            </div>


            {/* Items Table */}
            <div className="table-responsive mb-4">
                <table className="table table-bordered mb-0">
                    <thead className="template4-table-head text-white">
                    <tr>
                        <th className="p-3 template4-table-head">Item #/Item description</th>
                        <th className="p-3 text-center template4-table-head">Quantity</th>
                        <th className="p-3 text-center template4-table-head">Rate</th>
                        <th className="p-3 text-end template4-table-head">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.items.map((item, index) => (
                        <tr key={index}>
                            <td className="p-3">
                                <div className="fw-bold">{item.name}</div>
                                <div className="text-muted">{item.description}</div>
                            </td>
                            <td className="p-3 text-center">{item.qty}</td>
                            <td className="p-3 text-center">{data.currencySymbol}{item.amount.toFixed(2)}</td>
                            <td className="p-3 text-end">{data.currencySymbol}{(item.qty * item.amount).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Totals Table with proper width and right alignment */}
            <div className="template4-totals">
                <table className="template4-summary-table">
                    <tbody>
                    <tr>
                        <td>Sub Total</td>
                        <td className="text-end">
                        {data.currencySymbol}{subtotal.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td>Tax ({data.tax}%)</td>
                        <td className="text-end">
                        {data.currencySymbol}{taxAmount.toFixed(2)}
                        </td>
                    </tr>
                    <tr className="template4-grand-total-row">
                        <td className="fw-bold">Total Due</td>
                        <td className="text-end fw-bold">
                        {data.currencySymbol}{total.toFixed(2)}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>


            {/* Bank Account Details Section */}
            {(data.accountName || data.accountNumber || data.accountIfscCode) && (
                <div className="mt-4">
                    <h6 className="mb-2 template4-primary-color fw-semibold">Bank Account Details</h6>
                    {data.accountName && <p className="mb-1"><strong>Account Holder:</strong> {data.accountName}</p>}
                    {data.accountNumber && <p className="mb-1"><strong>Account Number:</strong> {data.accountNumber}</p>}
                    {data.accountIfscCode && <p className="mb-0"><strong>IFSC / Branch Code:</strong> {data.accountIfscCode}</p>}
                </div>
            )}

            {/* Footer */}
            {data?.notes && (
                <div className="template4-notes">
                    <h6>Remarks:</h6>
                    <p>{data.notes}</p>
                </div>
            )}
        </div>
    );
};

export default Template4;