import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://arc-lane-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );
    const resInterceptor = axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          logOut()
            .then(() => {
              toast.success("LogIn again !!");
              navigate("/login");
            })
            .catch((err) => {
              console.log("interceptor error ", err);
            });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
