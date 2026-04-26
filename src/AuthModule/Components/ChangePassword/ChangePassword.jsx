import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let navigate = useNavigate();

  let {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message || "Password changed successfully!");
      // Optionally navigate to dashboard or login
      // navigate("/dashboard"); 
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-lg-7 col-md-9 bg-white p-4 rounded-3 shadow-lg border">
          <div className="form-container">
            <div className="logo-container text-center mb-4">
              <img src={logo} alt="Logo" className="w-50" />
            </div>
            <div className="title mb-4">
              <h4>Change Your Password</h4>
              <p className="text-muted">
                Enter your details below
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Old Password */}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type={showOldPassword ? "text" : "password"}
                  {...register("oldPassword", {
                    required: "Old Password is required",
                  })}
                  className="form-control"
                  placeholder="Old Password"
                  aria-label="Old Password"
                  aria-describedby="basic-addon1"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  <i
                    className={`fa-solid ${
                      showOldPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
              {errors.oldPassword && (
                <div className="alert alert-danger p-2">
                  {errors.oldPassword.message}
                </div>
              )}

              {/* New Password */}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New Password is required",
                  })}
                  className="form-control"
                  placeholder="New Password"
                  aria-label="New Password"
                  aria-describedby="basic-addon1"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <i
                    className={`fa-solid ${
                      showNewPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
              {errors.newPassword && (
                <div className="alert alert-danger p-2">
                  {errors.newPassword.message}
                </div>
              )}

              {/* Confirm New Password */}
              <div className="input-group mb-4">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmNewPassword", {
                    required: "Confirm New Password is required",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                  className="form-control"
                  placeholder="Confirm New Password"
                  aria-label="Confirm New Password"
                  aria-describedby="basic-addon1"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  <i
                    className={`fa-solid ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
              {errors.confirmNewPassword && (
                <div className="alert alert-danger p-2">
                  {errors.confirmNewPassword.message}
                </div>
              )}

              <button className="btn btn-green w-100 py-2">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
