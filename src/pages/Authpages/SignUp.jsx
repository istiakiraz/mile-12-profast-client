import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import GoogleLogIn from "./GoogleLogIn";

const SignUp = () => {


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {createUser,} = useAuth()

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password)
    .then(result =>{
        console.log(result.user);
    } ).catch(error =>{
        console.log(error)
    })

  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <h1 className="lg:text-5xl mb-2 font-bold">Create an Account</h1>
          <p className="text-xl  mb-3">Register with Profast</p>

          {/* name input  */}
          <label className="label">Name</label>
          <input
            type="name"
            {...register("name", { required: true, maxLength: 20 })}
            className="input w-full"
            placeholder="Name"
          />

          {errors.name?.type === "required" && (
            <p className="text-red-700">First name is required</p>
          )}

          {errors.name?.type === "maxLength" && (
            <p className="text-red-700">
              First name must be under 20 characters
            </p>
          )}

          {/* email input */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />

          {errors.email?.type === "required" && (
            <p className="text-red-700">Email is required</p>
          )}

          {/* password input */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password" , { required: true, minLength: 6 })}
            className="input w-full"
            placeholder="Password"
          />

           {errors.password?.type === "required" && (
            <p className="text-red-700">Password is required</p>
          )}

          {errors.password?.type === "minLength" && (
            <p className="text-red-700">
              Password must be 6 characters or longer
            </p>
          )}



          <button className="btn btn-secondary text-black mt-4">
            Register
          </button>
        </fieldset>
      </form>
      <p className="text-[16px] mt-2 ">
        Already have an account?{" "}
        <Link to="/signin">
          {" "}
          <span className="text-secondary underline hover:text-green-800">
            Sign In
          </span>{" "}
        </Link>
      </p>
      <GoogleLogIn></GoogleLogIn>
    </div>
  );
};

export default SignUp;
