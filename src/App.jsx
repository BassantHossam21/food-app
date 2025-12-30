import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Shared/Components/AuthLayout/AuthLayout";
import Login from "./AuthModule/Components/Login/Login";
import Register from "./AuthModule/Components/Register/Register";
import ForgotPassword from "./AuthModule/Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./AuthModule/Components/ResetPassword/ResetPassword";
import VerifyAccount from "./AuthModule/Components/VerifyAccount/VerifyAccount";
import MasterLayout from "./Shared/Components/MasterLayout/MasterLayout";
import Dashboard from "./DashboardModule/Components/Dashboard/Dashboard";
import Userslist from "./UsersModule/Components/UsersList/Userslist";
import NotFound from "./Shared/Components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import RecipesList from "./RecipeModule/Components/RecipesList/RecipesList";
import RecipesData from "./RecipeModule/Components/RecipesData/RecipesData";
import CategoriesList from "./CategoriesModule/Components/CategoriesList/CategoriesList";
import CategoriesData from "./CategoriesModule/Components/CategoriesData/CategoriesData";
import ProtectedRoute from "./Shared/Components/ProtectedRoute/ProtectedRoute";
import FavoritesList from "./FavoritesModule/Components/FavoritesList/FavoritesList";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ForgotPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },

        // Shared routes - accessible by both Admin and Users
        { path: "recipes", element: <RecipesList /> },
        { path: "recipes-data", element: <RecipesData /> },
        { path: "recipes-data/:id", element: <RecipesData /> },

        // Admin only routes
        {
          path: "categories",
          element: (
            <ProtectedRoute allowedRoles={["SuperAdmin"]}>
              <CategoriesList />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories-data",
          element: (
            <ProtectedRoute allowedRoles={["SuperAdmin"]}>
              <CategoriesData />
            </ProtectedRoute>
          ),
        },
        {
          path: "users",
          element: (
            <ProtectedRoute allowedRoles={["SuperAdmin"]}>
              <Userslist />
            </ProtectedRoute>
          ),
        },

        // User only routes
        {
          path: "favorites",
          element: (
            <ProtectedRoute allowedRoles={["SystemUser"]}>
              <FavoritesList />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
