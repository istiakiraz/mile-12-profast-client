// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const MyParcels = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: parcels = [] } = useQuery({
//     queryKey: ["my-parcels", user.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/parcels?email=${user.email}`);
//       return res.data;
//     },
//   });

//   console.log(parcels);

//   return (
//     <div>
//       <h1>my parcels: {parcels.length}</h1>
//     </div>
//   );
// };

// export default MyParcels;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import dayjs from "dayjs";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleView = (parcel) => {
    console.log("View Parcel", parcel.tracking_id);
    // Future: Open modal here
  };

  const handlePay = (parcel) => {
    console.log("Paying for Parcel", parcel.tracking_id);
    // Future: Trigger payment flow here
  };

  const handleDelete = (parcel) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      // TODO: implement delete API
      console.log("Deleting", parcel._id);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-6">
        My Parcels ({parcels.length})
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200 text-base font-semibold text-base-content">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Date</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td className="capitalize">
                  {parcel.type === "document" ? "📄 Document" : "📦 Non-Document"}
                </td>
                <td>{dayjs(parcel.creation_date).format("YYYY-MM-DD hh:mm A")}</td>
                <td>৳{parcel.cost}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success "
                        : "badge-error "
                    } text-white`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleView(parcel)}
                    className="btn btn-xs btn-primary"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handlePay(parcel)}
                    className="btn btn-xs bg-secondary btn-accent"
                    disabled={parcel.payment_status === "paid"}
                  >
                    Pay
                  </button>
                  <button
                    onClick={() => handleDelete(parcel)}
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {parcels.length === 0 && (
          <p className="text-center py-8 text-sm text-gray-400">No parcels found.</p>
        )}
      </div>
    </div>
  );
};

export default MyParcels;

