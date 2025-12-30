import React from "react";
import logo from "../../../assets/images//logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const password = watch("password");

  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-lg-5 col-md-7 bg-white p-4 rounded-3">
              <div className="form-container">
                <div className="logo-container text-center ">
                  <img src={logo} alt="Logo" className="w-50" />
                </div>
                <div className="title">
                  <h4> Reset Password</h4>
                  <p className="text-muted">
                    Please Enter Your Otp or Check Your Inbox
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address ",
                        },
                      })}
                      className="form-control"
                      placeholder="Email"
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.email && (
                    <div className="alert alert-danger p-2">
                      {errors.email.message}
                    </div>
                  )}

                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type="text"
                      {...register("seed", {
                        required: "OTP is required",
                        pattern: {
                          value: /^[0-9a-zA-Z]{4}$/,
                          message: "OTP must be exactly 4 characters",
                        },
                      })}
                      className="form-control"
                      placeholder="OTP"
                      aria-label="OTP"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.seed && (
                    <div className="alert alert-danger p-2">
                      {errors.seed.message}
                    </div>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                          message:
                            "Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
                        },
                      })}
                      className="form-control"
                      placeholder="New Password"
                      aria-label="New Password"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.password && (
                    <div className="alert alert-danger p-2">
                      {errors.password.message}
                    </div>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === password ||
                          "The confirmPassword and password fields must match.",
                      })}
                      className="form-control"
                      placeholder="Confirm New Password"
                      aria-label="Confirm New Password"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="alert alert-danger p-2">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                  <button className="btn btn-green w-100 ">
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
