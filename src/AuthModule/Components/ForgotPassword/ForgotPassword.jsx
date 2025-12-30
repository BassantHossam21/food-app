import React from "react";
import logo from "../../../assets/images/logo.png";
import Register from "./../Register/Register";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  let navigate = useNavigate();
  let {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      toast.success(response.data.message);
      navigate("/reset-password");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="auth-container">
      <div className=" container-fluid bg-overlay ">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-5 bg-white p-4 rounded-3">
            <div className="form-container">
              <div className="logo-container text-center ">
                <img src={logo} alt="Logo" className="w-50" />
              </div>
              <div className="title">
                <h4>Forgot Your Password?</h4>
                <p className="text-muted">
                  No worries! Please enter your email and we will send a
                  password reset link
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-mobile-screen"></i>
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
                    placeholder="Enter your E-mail"
                    aria-label="E-mail"
                    aria-describedby="basic-addon1"
                  />
                </div>
                {errors.email && (
                  <div className="alert alert-danger p-2">
                    {errors.email.message}
                  </div>
                )}

                <button className="btn btn-green w-100 ">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
