import React from "react";
import logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function VerifyAccount() {
  let navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      let response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/verify",
        data
      );
      console.log(response);
      toast.success(response.data.message || "Account verified successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message || "Verification failed. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="container-fluid bg-overlay">
          <div className="row justify-content-center align-items-center min-vh-100 py-5">
            <div className="col-12 col-md-8 col-lg-5 bg-white p-4 p-md-5 rounded-4 shadow-lg">
              <div className="form-container">
                <div className="logo-container text-center ">
                  <img src={logo} alt="Logo" className="w-50" />
                </div>
                <div className="title">
                  <h4>Verify Account</h4>
                  <p className="text-muted">
                    Please Enter Your Otp or Check Your Inbox
                  </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-regular fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      {...register("email", {
                        required: "E-mail is required",
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
                      {...register("code", {
                        required: "OTP is required",
                      })}
                      className="form-control"
                      placeholder="OTP"
                      aria-label="OTP"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  {errors.code && (
                    <div className="alert alert-danger p-2">
                      {errors.code.message}
                    </div>
                  )}
                  
                  <button className="btn btn-green w-100 mt-3">send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
