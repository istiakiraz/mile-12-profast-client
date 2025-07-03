import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import GoogleLogIn from "./GoogleLogIn";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const axiosInstance = useAxios()

  const [profilePic, setProfilePic] = useState("");

  const onSubmit = (data) => {
    console.log(data);

    createUser(data.email, data.password)
      .then(async(result) => {
        console.log(result.user);

        //update user profile in database

        const userInfo = {
          email: data.email,
          role: 'user', // default role
          created_at : new Date().toISOString(),
          last_log_at : new Date().toISOString()
        }

        const userRes = await axiosInstance.post('/users', userInfo)


        console.log(userRes.data);



        //update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("profile name pic updated");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImgUpload = async (e) => {
    const image = e.target.files[0];
    // console.log(image);

    const formData = new FormData();
    formData.append("image", image);

    const imgURL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_Key
    }`;

    const res = await axios.post(imgURL, formData);

    setProfilePic(res.data.data.url);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <h1 className="lg:text-5xl mb-2 font-bold">Create an Account</h1>
          <p className="text-xl  mb-3">Register with Profast</p>

          {/* photo input  */}
          <label className="label">Upload You Profile Picture</label>
          <input
            type="file"
            onChange={handleImgUpload}
            className="input w-full"
            placeholder="Your Profile Picture"
          />

          {/* name input  */}
          <label className="label">Name</label>
          <input
            type="name"
            {...register("name", { required: true, maxLength: 20 })}
            className="input w-full"
            placeholder="Name"
          />

          {errors.name?.type === "required" && (
            <p className="text-red-700">Name is required</p>
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
            {...register("password", { required: true, minLength: 6 })}
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
