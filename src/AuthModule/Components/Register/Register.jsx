import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        data
      );
      toast.success(response.data.message || "Registration Successful!");
      navigate("/verify-account");
    } catch (error) {
      console.log("Error Response:", error.response);
      console.log("Error Data:", error.response?.data);
      console.log(
        "Validation Errors:",
        error.response?.data?.additionalInfo?.errors
      );

      // Show detailed error message
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      const validationErrors = error.response?.data?.additionalInfo?.errors;

      if (validationErrors) {
        console.log(
          "Detailed Validation Errors:",
          JSON.stringify(validationErrors, null, 2)
        );
      }

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-lg-7 col-md-9 bg-white p-5 rounded-4 shadow-lg">
            <div className="form-container">
              <div className="logo-container text-center ">
                <img src={logo} alt="Logo" className="w-50" />
              </div>
              <div className="title">
                <h4>Register</h4>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
              </div>
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-3 ">
                  {/* Username */}
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-mobile-screen"></i>
                      </span>
                      <input
                        type="text"
                        {...register("userName", {
                          required: "Username is required",
                          maxLength: {
                            value: 8,
                            message: "Username must not exceed 8 characters",
                          },
                          pattern: {
                            value: /^[a-zA-Z]+[0-9]+$/,
                            message:
                              "Username must contain characters and end with numbers (e.g., John123)",
                          },
                        })}
                        className="form-control"
                        placeholder="UserName"
                        aria-label="UserName"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {errors.userName && (
                      <div className="alert alert-danger p-2 mt-2">
                        {errors.userName.message}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-mobile-screen"></i>
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
                        placeholder="Enter your E-mail"
                        aria-label="E-mail"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {errors.email && (
                      <div className="alert alert-danger p-2 mt-2">
                        {errors.email.message}
                      </div>
                    )}
                  </div>

                  {/* Country */}
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type="text"
                        {...register("country", {
                          required: "Country is required",
                        })}
                        className="form-control"
                        placeholder="Country"
                        aria-label="Country"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {errors.country && (
                      <div className="alert alert-danger p-2 mt-2">
                        {errors.country.message}
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-mobile-screen"></i>
                      </span>
                      <input
                        type="tel"
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10,15}$/,
                            message: "Invalid phone number",
                          },
                        })}
                        className="form-control"
                        placeholder="PhoneNumber"
                        aria-label="PhoneNumber"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {errors.phoneNumber && (
                      <div className="alert alert-danger p-2 mt-2">
                        {errors.phoneNumber.message}
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                      />
                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i
                          className={`fa-solid ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                        ></i>
                      </span>
                    </div>
                    {errors.password && (
                      <div className="alert alert-danger p-2 mt-2">
                        {errors.password.message}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        className="form-control"
                        placeholder="confirm-password"
                        aria-label="Confirm Password"
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
                    {errors.confirmPassword && (
                      <div className="alert alert-danger p-2 mt-2">
                        {errors.confirmPassword.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Login Link */}
                <div className="text-end mt-3">
                  <Link
                    to="/login"
                    className="text-success text-decoration-none fw-semibold"
                  >
                    Login Now?
                  </Link>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-green w-100 mt-3 py-2">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
