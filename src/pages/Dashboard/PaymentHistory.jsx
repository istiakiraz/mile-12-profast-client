import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    data: payments = [],
  } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(payments[0]);

  if (isPending) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="overflow-x-auto bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-primary mb-4">💳 Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500 italic">No payments found.</p>
      ) : (
        <table className="table table-zebra text-sm">
          <thead>
            <tr className="bg-base-200 text-xs text-primary uppercase">
              <th>#</th>
              <th>Parcel Name</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Paid At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.title}</td>
                <td className="font-mono text-xs text-primary">
                  {payment.transactionId}
                </td>
                <td>৳{payment.amount}</td>
                <td>{payment.paymentMethod}</td>
                <td>{new Date(payment.paid_at).toLocaleString()}</td>
                <td>
                  <span className="badge badge-success text-white">Paid</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
