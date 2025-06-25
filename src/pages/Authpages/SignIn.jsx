import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const SignIn = () => {
  const { register, handleSubmit,  formState: { errors }, } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">

          <h1 className="lg:text-5xl mb-2 font-bold">Welcome Back</h1>
          <p className="text-xl  mb-3">Sign In with Profast</p>

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email" , { required: true })}
            className="input w-full"
            placeholder="Email"
          />

            {errors.email?.type === "required" && (
            <p className="text-red-700">Email is required</p>
          )}

          <label className="label">Password</label>
          <input
            type="password"
            {...register("password" , { required: true })}
            className="input w-full"
            placeholder="Password"
          />

           {errors.password?.type === "required" && (
            <p className="text-red-700">password is required</p>
          )}

          <div>
            <a className="link text-[16px] underline link-hover">
              Forgot password?
            </a>
          </div>

          <button className="btn btn-secondary text-black mt-4">Login</button>
          
        </fieldset>
      </form>
       <p className='text-[16px] mt-2 ' >Don’t have any account?  <Link to='/signup' > <span className='text-secondary underline hover:text-green-800' >Register</span> </Link></p>
    </div>
  );
};

export default SignIn;
