import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const handleView = (parcel) => {
    console.log("View Parcel", parcel.tracking_id);
    // Future: Open modal here
  };

  const handlePay = (id) => {
    console.log("Paying for Parcel", id);
    navigate(`/dashboard/payment/${id}`)
  };

 const handleDelete = (parcel) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You are about to delete parcel: ${parcel.title}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${parcel._id}`);
        if (res.data?.deletedCount > 0) {
          refetch()
          Swal.fire("Deleted!", "Parcel has been deleted.", "success");
          
        } else {
          Swal.fire("Error!", "Parcel could not be deleted.", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  });
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
              <th>Title</th>
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
                <td className="max-w-[180px] truncate" >{parcel.title}</td>
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
                    onClick={() => handlePay(parcel._id)}
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

