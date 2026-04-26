import React, { useContext, useState } from "react";
import logo from "../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  let { saveLoginData } = useContext(AuthContext);
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
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data,
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message, {
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
                  <h4>Log In</h4>
                  <p className="text-muted">
                    Welcome Back! Please enter your details
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
                    <div className="alert alert-danger p-2">
                      {errors.email.message}
                    </div>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="form-control"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon1"
                    />
                    <span
                      className="input-group-text"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ cursor: "pointer" }}
                    >
                      <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                    </span>
                  </div>
                  {errors.password && (
                    <div className="alert alert-danger p-2">
                      {errors.password.message}
                    </div>
                  )}
                  <div className="links d-flex justify-content-between my-2">
                    <Link
                      to="/register"
                      className="text-black text-decoration-none"
                    >
                      Register Now?
                    </Link>
                    <Link
                      to="/forgot-password"
                      className=" text-success  text-decoration-none"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button className="btn btn-green w-100 ">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
