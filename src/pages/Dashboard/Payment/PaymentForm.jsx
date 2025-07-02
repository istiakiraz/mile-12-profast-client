import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = () => {
    const stripe =useStripe();
    const elements = useElements();

    const [error, setError] = useState('') 


    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }

        const card = elements.getElement(CardElement)

        if(!card){
            return;
        }

        const {error, paymentMethod  } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            setError(error.message)

        }else{  
                setError('');
                console.log('payment', paymentMethod);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 mt-6 bg-white p-6 rounded-xl shadow-md w-10/12 lg:w-6/12 mx-auto ' >
            <CardElement className='p-2 border rounded' >

            
            </CardElement>

            <button type='submit' className='btn text-primary btn-secondary w-full' disabled={!stripe} >
                Pay For Parcel Pickup
            </button>

            {error && <p className='mt-3 text-red-500 ' >{error}</p> }

            </form>
        </div>
    );
};

export default PaymentForm;