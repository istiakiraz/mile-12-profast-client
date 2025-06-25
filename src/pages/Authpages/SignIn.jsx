import React from 'react';

const SignIn = () => {
    return (
        <div>
           <form >
             <fieldset className="fieldset">
                <h1 className='lg:text-5xl mb-2 font-bold'>Welcome Back</h1>
                <p className='text-xl  mb-3' >Sign In with Profast</p>
          <label className="label">Email</label>
          <input type="email" className="input w-full" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input w-full" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-secondary text-black mt-4">Login</button>
        </fieldset>
           </form>
        </div>
    );
};

export default SignIn;