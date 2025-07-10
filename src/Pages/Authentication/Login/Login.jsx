import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Label,
  TextInput,
  Checkbox,
  Card,
  Spinner,
} from "flowbite-react";
import { FaGoogle, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router"; // use "react-router-dom" if needed
import Logo from "../../Shared/Logo/Logo";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import GithubLogin from "../SocialLogin/GithubLogin";

const Login = () => {
  const { emailPassLogin } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setError("");
    setLoading(true);
    emailPassLogin(data.email, data.password)
      .then(() => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Successfully logged in",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        console.log(err); // full error log from Firebase
        setError(err.code.split("/")[1]);
        setLoading(false);
        // Show specific Firebase message in toast
        toast.error(err.code.split("/")[1] || "Login failed");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 font-inter">
      <div className="absolute top-[5%] left-[2%]">
        <Logo />
      </div>
      <div className="w-full max-w-md mt-22">
        <Card className="bg-white dark:bg-gray-800 shadow-xl">
          <h1 className="text-3xl font-bold text-center dark:text-white mb-4 font-fjalla">
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="dark:text-white">
                Email
              </Label>
              <TextInput
                id="email"
                type="email"
                autoComplete="email" // ✅ add this
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
                  {errors.email.message}
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
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                color={errors.password ? "failure" : undefined}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-base text-red-500">{error}</p>}

            {/* Submit */}
            {loading ? (
              <Button className="w-full">
                <Spinner aria-label="Spinner button example" size="sm" light />
                <span className="pl-3">Loading...</span>
              </Button>
            ) : (
              <Button type="submit" className="cursor-pointer" fullSized>
                Sign In
              </Button>
            )}

            {/* Toggle to register */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-300">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                Register here
              </Link>
            </p>

            {/* Social Login */}
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

export default Login;
