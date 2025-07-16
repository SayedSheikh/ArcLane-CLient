import React from "react";
import { FaGithub } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";

const GithubLogin = () => {
  const { githubAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from || "/";

  const axios = useAxios();
  const handleClick = () => {
    githubAuth()
      .then(async (res) => {
        const userDetails = {
          username: res.user.displayName,
          email: res.user.providerData[0].email,
          role: "user",
          imgUrl: res.user.photoURL,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        await axios.post("/users", userDetails);

        Swal.fire({
          icon: "success",
          title: "Successfully logged in",
          confirmButtonText: "OK",
        }).then(() => {
          navigate(from);
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
      <FaGithub className="dark:text-white scale-125" />
      <span className="text-sm font-medium dark:text-white">
        Continue with Github
      </span>
    </button>
  );
};

export default GithubLogin;
