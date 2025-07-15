import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const reqInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;
        return config;
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );
    const resInterceptor = axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(reqInterceptor);
      axiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [user]);

  return axiosInstance;
};

export default useAxiosSecure;
