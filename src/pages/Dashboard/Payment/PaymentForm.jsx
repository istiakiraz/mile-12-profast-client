import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const {user } = useAuth()
    const navigate = useNavigate();
  const [error, setError] = useState("");


  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <p className="text-center">loading...</p>;
  }

  // console.log(parcelInfo);

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    
    //step -1 : card ok ??
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      
      console.log("payment", paymentMethod);
      
       // step-02: create payment intent
    
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId,
    });

    const clientSecret = res.data.clientSecret;

    // STEP-03 : 
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email
        },
      },
    });

    if(result.error){ 
        setError(result.error.message);
    }else{
      setError('')
        if(result.paymentIntent.status === "succeeded"){
            alert("payment succeeded")
            // step-04 : mark parcel paid also create payment history

            const paymentData = {
              parcelId,
              email: user.email,
              amount,
              transactionId: result.paymentIntent.id,
               paymentMethod: result.paymentIntent.payment_method_types
            }
            const paymentRes = await axiosSecure.post('/payments', paymentData)
            if(paymentRes.data.insertedId){
             await Swal.fire({
                icon : 'success',
                title: "Payment Successful!",
                html: `<strong> Transaction ID : </strong> <code> ${result.paymentIntent.id} </code> `,
                confirmButtonText: "Go to My Parcels",
              });
              
              navigate('/dashboard/myparcels')
            }
        }
    }

    console.log("res intent ", res);

    }

   
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mt-6 bg-white p-6 rounded-xl shadow-md w-10/12 lg:w-6/12 mx-auto "
      >
        <CardElement className="p-2 border rounded"></CardElement>

        <button
          type="submit"
          className="btn text-primary btn-secondary w-full"
          disabled={!stripe}
        >
          Pay <span className="font-extrabold">৳{amount}</span> For Parcel
          Pickup
        </button>

        {error && <p className="mt-3 text-red-500 ">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
