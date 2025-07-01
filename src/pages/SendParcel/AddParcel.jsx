import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

const AddParcel = () => {
  const [type, setType] = useState("document");
  const [deliveryCost, setDeliveryCost] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");
  const [filteredSenderCenters, setFilteredSenderCenters] = useState([]);
  const [filteredReceiverCenters, setFilteredReceiverCenters] = useState([]);
  const [pricingDetails, setPricingDetails] = useState(null);

  // Define confirmRef using useRef
  const confirmRef = useRef(null);


    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => setWarehouses(data));
  }, []);

  useEffect(() => {
    if (senderRegion) {
      const centers = warehouses
        .filter((w) => w.region === senderRegion)
        .map((w) => w.district);
      setFilteredSenderCenters(centers);
    } else {
      setFilteredSenderCenters([]);
    }
  }, [senderRegion, warehouses]);

  useEffect(() => {
    if (receiverRegion) {
      const centers = warehouses
        .filter((w) => w.region === receiverRegion)
        .map((w) => w.district);
      setFilteredReceiverCenters(centers);
    } else {
      setFilteredReceiverCenters([]);
    }
  }, [receiverRegion, warehouses]);

  const onSubmit = (data) => {
    const { senderCenter, receiverCenter, weight } = data;
    const isSameCity = senderCenter === receiverCenter;
    let cost = 0;
    let breakdown = "";

    if (type === "document") {
      cost = isSameCity ? 60 : 80;
      breakdown = isSameCity
        ? "Document Delivery (Within City): ৳60"
        : "Document Delivery (Outside City): ৳80";
    } else {
      const w = parseFloat(weight) || 0;
      if (w <= 3) {
        cost = isSameCity ? 110 : 150;
        breakdown = isSameCity
          ? `Non-Document (≤ 3kg, Within City): ৳110`
          : `Non-Document (≤ 3kg, Outside City): ৳150`;
      } else {
        const extraKg = Math.ceil(w - 3);
        const extraCost = extraKg * 40;
        if (isSameCity) {
          cost = 110 + extraCost;
          breakdown = `Non-Document (> 3kg, Within City): ৳110 + ৳${extraKg}kg × 40 = ৳${cost}`;
        } else {
          cost = 150 + extraCost + 40;
          breakdown = `Non-Document (> 3kg, Outside City): ৳150 + ৳${extraKg}kg × 40 + ৳40 extra = ৳${cost}`;
        }
      }
    }

    setDeliveryCost(cost);
    setPricingDetails(breakdown);
    setShowConfirm(true);
    toast.success(`Estimated Delivery Cost: ৳${cost}`, { duration: 3000 });
  };

  const confirmSave = async () => {
    const formData = {
      ...watch(),
      type,
      created_by: user.email,
      creation_date: new Date().toISOString(),
      payment_status: "unpaid",
      delivery_status: "not_collected",
      tracking_id: generateTrackingID(),
      cost: deliveryCost,

    };

    axiosSecure.post('/parcels', formData)
    .then(res=>{
        console.log(res.data);

        if(res.data.insertedId){

            // TODO: redirect to payment page
    console.log("Saved Parcel:", formData);
    toast.success("Parcel info saved!");
    // reset();
    setShowConfirm(false);

        }
    })


    
  };

  return (
    <div className="lg:w-11/12 my-10 mx-auto p-6 pt-16 bg-base-100 shadow rounded-xl">
      <div className="w-11/12 mx-auto">
        <h2 className="text-5xl font-bold text-primary   mb-4">Add Parcel</h2>
        <p className=" mb-6 font-bold   text-primary">
          Fill in the parcel, sender, and receiver details.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Parcel Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-6">
            <div className="md:col-span-2">
              <label className="label">Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    className="radio radio-primary"
                    checked={type === "document"}
                    onChange={() => setType("document")}
                  />
                  Document
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    className="radio radio-primary"
                    checked={type === "non-document"}
                    onChange={() => setType("non-document")}
                  />
                  Non-Document
                </label>
              </div>
            </div>

            <div>
              <label className="label">Parcel Title</label>
              <input
                {...register("title", { required: true })}
                className="input input-bordered w-full"
                placeholder="Parcel Name"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  Parcel name is required
                </p>
              )}
            </div>

            {type === "non-document" && (
              <div>
                <label className="label">Parcel Weight (KG)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register("weight", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Weight"
                />
              </div>
            )}
          </div>

          {/* Sender Info */}
          <div className="grid md:grid-cols-2 gap-6 border-b pb-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Sender Information</h3>
              <input
                {...register("senderName", { required: true })}
                className="input input-bordered w-full mb-3"
                placeholder="Sender Name"
              />
              <input
                {...register("senderContact", { required: true })}
                className="input input-bordered w-full mb-3"
                placeholder="Sender Contact"
              />

              <div>
                <select
                  className="select select-bordered w-full mb-3"
                  {...register("senderRegion", { required: true })}
                  onChange={(e) => setSenderRegion(e.target.value)}
                >
                  <option value="">Select Sender Region</option>
                  {[...new Set(warehouses.map((w) => w.region))].map(
                    (region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <select
                  className="select select-bordered mb-3 w-full"
                  {...register("senderCenter", { required: true })}
                >
                  <option value="">Select Sender Service Center</option>
                  {filteredSenderCenters.map((center) => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
              </div>

              <input
                {...register("senderAddress", { required: true })}
                className="input input-bordered w-full mb-3"
                placeholder="Sender Address"
              />
              <textarea
                {...register("pickupInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Pickup Instruction"
              ></textarea>
            </div>

            {/* Receiver Info */}
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Receiver Information
              </h3>
              <input
                {...register("receiverName", { required: true })}
                className="input input-bordered w-full mb-3"
                placeholder="Receiver Name"
              />
              <input
                {...register("receiverContact", { required: true })}
                className="input input-bordered w-full mb-3"
                placeholder="Receiver Contact"
              />

              <div>
                <select
                  className="select select-bordered w-full mb-3"
                  {...register("receiverRegion", { required: true })}
                  onChange={(e) => setReceiverRegion(e.target.value)}
                >
                  <option value="">Select Receiver Region</option>
                  {[...new Set(warehouses.map((w) => w.region))].map(
                    (region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <select
                  className="select select-bordered mb-3 w-full"
                  {...register("receiverCenter", { required: true })}
                >
                  <option value="">Select Receiver Service Center</option>
                  {filteredReceiverCenters.map((center) => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
              </div>

              <input
                {...register("receiverAddress", { required: true })}
                className="input input-bordered w-full mb-3"
                placeholder="Receiver Address"
              />
              <textarea
                {...register("deliveryInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
                placeholder="Delivery Instruction"
              ></textarea>
            </div>
          </div>

          <p className="font-bold">*PickUp Time 4pm-7pm Approx.</p>

          <div className="text-center">
            <button className="btn btn-secondary text-primary px-10" type="submit">
              Submit
            </button>
          </div>
        </form>

        {/* Confirm Dialog */}
        {showConfirm && (
          <div ref={confirmRef} className="text-center mt-6">
            <p className="text-lg font-medium mb-4">
              Total Cost: <span className="text-primary font-bold">৳{deliveryCost}</span>
            </p>
          {pricingDetails && (
  <div className="bg-base-200 p-6 rounded-xl mb-6 max-w-2xl mx-auto border border-primary/30 shadow-sm">
    <h3 className="text-lg font-bold text-primary mb-3">📦 Pricing Breakdown</h3>
    <div className="text-sm leading-6 text-left space-y-2">
      <p>
        <span className="font-medium">Parcel Type:</span>{" "}
        <span className="capitalize text-neutral">{type.replace("-", " ")}</span>
      </p>
      {type === "non-document" && (
        <p>
          <span className="font-medium">Weight:</span>{" "}
          {watch("weight") ? `${watch("weight")} kg` : "N/A"}
        </p>
      )}
      <p>
        <span className="font-medium">Sender Center:</span>{" "}
        {watch("senderCenter") || "N/A"}
      </p>
      <p>
        <span className="font-medium">Receiver Center:</span>{" "}
        {watch("receiverCenter") || "N/A"}
      </p>
      <hr className="border-secondary my-2" />
      <p className="text-primary font-semibold">{pricingDetails}</p>
      <p className="text-xs text-primary mt-2 italic">
        Note: "Within City" means sender and receiver are in the same city/district.
        "Outside City" means they are different.
      </p>
    </div>
  </div>
)}
            <button onClick={confirmSave} className="btn bg-red-500 text-white ">
              Confirm & Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddParcel;

// https://chatgpt.com/s/t_6862f12e62608191a0faad162a1a7d39
