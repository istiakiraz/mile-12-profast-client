import React from "react";
import { useForm } from "react-hook-form";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import riderPic from "../../assets/pic/agent-pending.png";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RiderForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure()

  const { user } = useAuth();

  const onSubmit = async(data) => {

    const riderData = {
        ...data,
        name: user?.displayName,
        email: user?.email,
        status: 'pending',
        created_at: new Date().toISOString()
    }


    // console.log(riderData);

    axiosSecure.post('/riders', riderData)
    .then(res=>{
        // console.log(res.data.insertedId);
        if(res.data.insertedId){
              Swal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        text: "Your application is pending approval",
          iconColor: '#caeb66',
        confirmButtonColor: '#caeb66'
    })

        }else{
            alert('rider already exists')
        }
    })

  


    // you can send `data` to your backend here
    // reset()
  };

  return (
    <div className="bg-base-100 my-12  mx-auto w-11/12 lg:py-20 py-10 lg:px-16  px-6 rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Form Area */}
        <div>
          <h2 className="text-3xl font-bold text-primary mb-2">Be a Rider</h2>
          <p className="text-sm text-gray-600 border-gray-300 border-b-1 pb-6 mb-6">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h1 className="text-primary font-bold text-2xl">
              Tell us about yourself
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                defaultValue={user?.displayName}
                placeholder="Your Name"
                className="input input-bordered w-full"
                readOnly
              />
              <input
                {...register("age", { required: true })}
                placeholder="Your age"
                type="number"
                className="input input-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                defaultValue={user?.email}
                placeholder="Your Email"
                type="email"
                className="input input-bordered w-full"
                readOnly
              />
              <select
                {...register("region", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select your region</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                {/* Add more as needed */}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register("nid", { required: true })}
                placeholder="NID No"
                className="input input-bordered w-full"
              />
              <input
                {...register("contact", { required: true })}
                placeholder="Contact"
                type="tel"
                className="input input-bordered w-full"
              />
              <input
                {...register("bike_name", { required: true })}
                placeholder="Your Bike Name"
                type="text"
                className="input input-bordered w-full"
              />
              <input
                {...register("bike_license", { required: true })}
                placeholder="Bike License Number"
                type="text"
                className="input input-bordered w-full"
              />
            </div>

            <select
              {...register("warehouse", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select wire-house</option>
              <option value="Dhaka Warehouse">Dhaka Warehouse</option>
              <option value="Chattogram Warehouse">Chattogram Warehouse</option>
              <option value="Sylhet Warehouse">Sylhet Warehouse</option>
              {/* Add more as needed */}
            </select>

            <button
              type="submit"
              className="btn bg-secondary hover:bg-lime-500 text-black w-full mt-2"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Rider Image */}
        <div className="flex justify-center items-center">
          <img src={riderPic} alt="Rider" className="w-80 md:w-96" />
        </div>
      </div>
    </div>
  );
};

export default RiderForm;
