import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Label,
  TextInput,
  FileInput,
  Card,
  Spinner,
} from "flowbite-react";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router"; // or react-router-dom
import Logo from "../../Shared/Logo/Logo";
import useAuth from "../../../Hooks/useAuth";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import GithubLogin from "../SocialLogin/GithubLogin";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  const from = location?.state?.from || "/";

  const { emailPassSignup, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const axios = useAxios();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    const userDetails = {
      username: data.name,
      email: data.email,
      role: "user",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      userDetails.imgUrl = res?.data?.secure_url;
    } catch (err) {
      console.log("image upload error", err);
      toast.error("Failed to upload image");
      setLoading(false);
      return; // Stop further execution
    }

    emailPassSignup(data.email, data.password)
      .then(() => {
        updateUserProfile({
          displayName: userDetails.username,
          photoURL: userDetails.imgUrl,
        })
          .then(() => {
            // ✅ SweetAlert on success
            Swal.fire({
              icon: "success",
              title: "Signup Successful!",
              text: "Welcome to ArcLane.",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Go to Home",
            }).then(async () => {
              await axios.post("/users", userDetails);

              navigate(from);
            });

            setLoading(false);
          })
          .catch((err) => {
            console.log("Profile update error", err);
            toast.error("Failed to update profile");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log("Signup error", err);
        toast.error("Signup failed. " + err.code);
        setLoading(false);
        setError(err.code);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 font-inter">
      <div className="absolute top-[5%] left-[2%]">
        <Logo />
      </div>
      <div className="w-full max-w-md mt-25 mb-10">
        <Card className="bg-white dark:bg-gray-800 shadow-xl">
          <h1 className="text-3xl font-bold text-center dark:text-white mb-4 font-fjalla">
            Create an Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="dark:text-white">
                Full Name
              </Label>
              <TextInput
                id="name"
                type="text"
                autoComplete="text"
                placeholder="John Doe"
                {...register("name", { required: "Name is required" })}
                color={errors?.name ? "failure" : undefined}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.name?.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="dark:text-white">
                Email
              </Label>
              <TextInput
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                color={errors.email ? "failure" : undefined}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.email?.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="dark:text-white">
                Password
              </Label>
              <TextInput
                id="password"
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    minLength: (value) =>
                      value.length >= 6 ||
                      "Password must be at least 6 characters",
                    hasUpper: (value) =>
                      /[A-Z]/.test(value) ||
                      "Must include at least one uppercase letter",
                    hasLower: (value) =>
                      /[a-z]/.test(value) ||
                      "Must include at least one lowercase letter",
                  },
                })}
                color={errors?.password ? "failure" : undefined}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="dark:text-white">
                Confirm Password
              </Label>
              <TextInput
                id="confirmPassword"
                type="password"
                placeholder="********"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Password didn't match",
                })}
                color={errors?.confirmPassword ? "failure" : undefined}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.confirmPassword?.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image" className="dark:text-white">
                Upload Profile Image
              </Label>
              <FileInput
                id="image"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                  validate: {
                    isImage: (files) => {
                      const file = files?.[0];
                      if (!file) return "Image is required";
                      const validTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "image/webp",
                      ];
                      return (
                        validTypes.includes(file.type) ||
                        "Only image files are allowed"
                      );
                    },
                  },
                })}
                color={errors?.image ? "failure" : undefined}
              />
              {errors.image && (
                <p className="text-sm text-red-500 mt-1">
                  {errors?.image?.message}
                </p>
              )}
            </div>

            {error && <p className="text-base text-red-500">{error}</p>}

            {/* Submit */}
            {loading ? (
              <Button className="w-full">
                <Spinner aria-label="Spinner button example" size="sm" light />
                <span className="pl-3">Loading...</span>
              </Button>
            ) : (
              <Button type="submit" fullSized className="cursor-pointer">
                Sign Up
              </Button>
            )}

            {/* Toggle to login */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                Sign in here
              </Link>
            </p>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <GoogleLogin></GoogleLogin>
              <GithubLogin></GithubLogin>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
