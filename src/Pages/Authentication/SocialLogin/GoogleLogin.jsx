import React from "react";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";

const GoogleLogin = () => {
  const { googleAuth } = useAuth();
  const navigate = useNavigate();

  const axios = useAxios();

  const handleClick = () => {
    googleAuth()
      .then(async (res) => {
        console.log(res.user);

        const userDetails = {
          username: res.user.displayName,
          email: res.user.email,
          role: "user",
          imgUrl: res.user.photoURL,
        };

        const res2 = await axios.post("/users", userDetails);
        console.log(res2);
        Swal.fire({
          icon: "success",
          title: "Successfully logged in",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Social LogIn Error");
      });
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex items-center justify-center gap-2 w-full border border-gray-300 dark:border-gray-600 rounded px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
      <FaGoogle className="text-red-500" />
      <span className="text-sm font-medium dark:text-white">
        Continue with Google
      </span>
    </button>
  );
};

export default GoogleLogin;
