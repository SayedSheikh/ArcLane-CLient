import React, { useState } from "react";
import { Avatar, Button } from "flowbite-react";
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { HiLogout, HiViewGrid } from "react-icons/hi";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router";

const CustomAvatar = () => {
  const [isActive, setIsActive] = useState(false);

  const { logOut, user } = useAuth();

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    setIsActive(!isActive);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then((res) => {
            console.log(res);

            Swal.fire({
              icon: "success",
              title: "Logged out successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Logout failed");
          });
      }
    });
  };

  const image = (
    <>
      <Avatar
        img={user?.photoURL}
        rounded
        bordered={false} // disable Flowbite's default border
        onClick={handleClick}
        className={`cursor-pointer rounded-full p-0 transition duration-100 hover:ring-2 ring-2 ring-primary ${
          isActive ? "ring-secondary" : ""
        }`}
      />
    </>
  );
  return (
    <div className="flex flex-wrap gap-2 ">
      <Dropdown inline label={image} arrowIcon={false}>
        <DropdownHeader>
          <span className="block text-sm">{user?.displayName}</span>
          <span
            title={user?.email}
            className="block truncate text-sm font-medium">
            {user?.email}
          </span>
        </DropdownHeader>
        <Link to="/dashboard">
          <DropdownItem
            icon={HiViewGrid}
            onClick={() => setIsActive(!isActive)}>
            Dashboard
          </DropdownItem>
        </Link>
        <DropdownDivider />
        <DropdownItem onClick={handleLogout} icon={HiLogout}>
          Sign out
        </DropdownItem>
      </Dropdown>
    </div>
  );
};

export default CustomAvatar;
