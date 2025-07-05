import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaCheck, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PendingRider = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const { data: riders = [], isLoading, refetch } = useQuery({
    queryKey: ["pending-rider"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  const handleApprove = async (id, email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#66BB6A",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    });

    if (confirm.isConfirmed) {
     
      const  status = "approved";
      try {
        const res = await axiosSecure.patch(`/riders/${id}/status`, {
         status,
         email
        });

        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: "Rider Approved!",
            text: "The rider has been approved.",
            iconColor: "#66BB6A",
          });
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Approval Failed",
          text: err.message,
        });
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Pending Riders
      </h2>

      <div className="overflow-x-auto">
       <table className="table table-zebra w-full">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Region</th>
      <th>Warehouse</th>
      <th>Status</th>
      <th>Applied At</th> {/* ✅ New column */}
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {riders.map((rider) => (
      <tr key={rider._id}>
        <td>{rider.name}</td>
        <td>{rider.email}</td>
        <td>{rider.region}</td>
        <td>{rider.warehouse}</td>
        <td>
          <span className="badge badge-warning capitalize">
            {rider.status}
          </span>
        </td>
        <td>
          {new Date(rider.created_at).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </td> {/* ✅ Show formatted date */}
        <td className="flex flex-wrap gap-2">
          <button
            onClick={() => handleApprove(rider?._id, rider.email )}
            className="btn btn-success btn-sm text-white"
          >
            <FaCheck className="mr-1" /> Approve
          </button>
          <button
  onClick={() => setSelectedRider(rider)}
  htmlFor="rider-details-modal"
  className="btn btn-info btn-sm text-white"
>
  <FaEye className="mr-1" /> Details
</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      {/* Modal */}
<input type="checkbox" id="rider-details-modal" className="modal-toggle" checked={!!selectedRider} readOnly />
<div className="modal backdrop-blur-sm bg-black/30 transition-opacity duration-300">
  <div className="modal-box bg-secondary text-primary">
    <h3 className="font-bold text-lg mb-4">Rider Details</h3>
    <div className="space-y-2 text-sm">
      <p><strong>Name:</strong> {selectedRider?.name}</p>
      <p><strong>Email:</strong> {selectedRider?.email}</p>
      <p><strong>Age:</strong> {selectedRider?.age}</p>
      <p><strong>Region:</strong> {selectedRider?.region}</p>
      <p><strong>Warehouse:</strong> {selectedRider?.warehouse}</p>
      <p><strong>Contact:</strong> {selectedRider?.contact}</p>
      <p><strong>NID:</strong> {selectedRider?.nid}</p>
      <p><strong>Bike Name:</strong> {selectedRider?.bike_name}</p>
      <p><strong>Bike License:</strong> {selectedRider?.bike_license}</p>
      <p><strong>Status:</strong> {selectedRider?.status}</p>
      <p><strong>Applied At:</strong> {new Date(selectedRider?.created_at).toLocaleString()}</p>
    </div>
    <div className="modal-action">
      <label
        htmlFor="rider-details-modal"
        className="btn"
        onClick={() => setSelectedRider(null)}
      >
        Close
      </label>
    </div>
  </div>
</div>

    </div>
  );
};

export default PendingRider;
