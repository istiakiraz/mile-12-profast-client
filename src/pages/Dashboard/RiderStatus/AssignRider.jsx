import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?payment_status=paid&delivery_status=not_collected"
      );
      return res.data;
    },
  });

  const handleAssignClick = (parcel) => {
    console.log("Assigning rider for parcel:", parcel.tracking_id);
    // Future: open modal or send assign API
  };

  return (
    <div className="p-6 w-11/12 mx-auto">
      <h2 className="text-2xl font-bold mb-4">📦 Assign Rider - Pending Parcels</h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading parcels...</p>
      ) : parcels.length === 0 ? (
        <p className="text-center text-gray-500">No pending parcels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Cost</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.tracking_id}</td>
                  <td>{parcel.title}</td>
                  <td>{parcel.type}</td>
                  <td>{parcel.cost}৳</td>
                  <td>{parcel.senderName}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.senderCenter}</td>
                  <td>{parcel.receiverCenter}</td>
                  <td>
                    <span className="badge badge-warning">{parcel.delivery_status}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleAssignClick(parcel)}
                      className="btn btn-xs bg-primary text-white hover:bg-primary-focus"
                    >
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
