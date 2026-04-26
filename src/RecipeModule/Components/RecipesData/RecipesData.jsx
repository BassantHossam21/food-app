import React, { useEffect, useState } from "react";
import HomeCard from "../../../Shared/Components/HomeCard/HomeCard";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function RecipesData() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  let {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const recipeImage = watch("recipeImage");
  
  // Simple image preview logic
  const imagePreview = recipeImage?.[0] instanceof File 
    ? URL.createObjectURL(recipeImage[0]) 
    : typeof recipeImage === "string" 
    ? `https://upskilling-egypt.com:3006/${recipeImage}` 
    : null;

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagId", data.tagId);
    // Round the price to an integer since the API rejects decimals
    formData.append("price", Math.round(data.price));
    formData.append("description", data.description);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("recipeImage", data.recipeImage[0]);
    return formData;
  };
  //Add Recipe (Call API)
  const addRecipe = async (data) => {
    const recipeData = appendToFormData(data);
    console.log(recipeData);
    //call api
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Recipe/",
        recipeData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response);
      toast.success("Recipe Added Successfully");
      navigate("/dashboard/recipes");
    } catch (error) {
      toast.error("Recipe Added Failed");
      console.log(error);
    }
  };

  //Update Recipe (Call API)
  const UpdateRecipeById = async (data) => {
    const recipeData = appendToFormData(data);
    try {
      let response = await axios.put(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        recipeData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      toast.success("Recipe Updated Successfully");
      navigate("/dashboard/recipes");
      console.log(response.data);
    } catch (error) {
      toast.error("Recipe Updated Failed");
      console.log(error);
    }
  };
  //Submit (Update or Add)
  const onSubmit = async (data) => {
    if (id) {
      UpdateRecipeById(data);
    } else {
      addRecipe(data);
    }
  };

  //Get Recipe By Id
  const getRecipeById = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const recipe = response.data;

      setValue("name", recipe.name);
      setValue("tagId", recipe.tag.id);
      setValue("price", recipe.price);
      setValue("description", recipe.description);
      setValue("categoriesIds", recipe.category[0].id);
      setValue("recipeImage", recipe.imagePath);
    } catch (error) {
      console.log(error);
    }
  };

  // Get All Categories
  const getAllCategories = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data.data);
      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get All Tags
  const getAllTags = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag/",
      );
      console.log(response.data);
      setTagsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllTags();
    if (id) {
      getRecipeById();
    }
  }, []);

  return (
    <div>
      <HomeCard
        title="Fill the"
        highlightWord="Recipes"
        to="/dashboard/recipes"
        buttonText="All Recipes"
      />

      <div className="recipes-form-container m-auto mt-4 px-3 px-md-0">
        {/* Add New Item Title */}
        <div className="pb-3">
          <h5 className="text-muted fw-normal mb-0" style={{ fontSize: "16px" }}>Add New Item</h5>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="recipes-form pb-5">

        {/* Recipe Name */}
        <div className="mb-3">
          <input
            type="text"
            {...register("name", { required: "Recipe Name is required" })}
            className={`form-control recipes-input ${errors.name ? "is-invalid" : ""}`}
            placeholder="Recipe Name"
          />
          {errors.name && <div className="invalid-feedback d-block">{errors.name.message}</div>}
        </div>

        {/* Tag */}
        <div className="mb-3">
          <select
            {...register("tagId", { required: "Tag is required" })}
            className={`form-select recipes-select ${errors.tagId ? "is-invalid" : ""}`}
          >
            <option value="" disabled hidden selected>Tag</option>
            {tagsList.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
          {errors.tagId && <div className="invalid-feedback d-block">{errors.tagId.message}</div>}
        </div>

        {/* Price with EGP suffix */}
        <div className="mb-3">
          <div className="input-group recipes-price-group">
            <input
              type="number"
              step="any"
              min="0"
              {...register("price", { 
                required: "Price is required",
                min: { value: 0, message: "Price cannot be negative" }
              })}
              className={`form-control recipes-input border-end-0 ${errors.price ? "is-invalid" : ""}`}
              placeholder="350.99"
            />
            <span className="input-group-text recipes-suffix">EGP</span>
          </div>
          {errors.price && <div className="invalid-feedback d-block">{errors.price.message}</div>}
        </div>

        {/* Category */}
        <div className="mb-3">
          <select
            {...register("categoriesIds", { required: "Category is required" })}
            className={`form-select recipes-select ${errors.categoriesIds ? "is-invalid" : ""}`}
          >
            <option value="" disabled hidden selected>Categ</option>
            {categoriesList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoriesIds && <div className="invalid-feedback d-block">{errors.categoriesIds.message}</div>}
        </div>

        {/* Description */}
        <div className="mb-3">
          <textarea
            {...register("description", { required: "Description is required" })}
            className={`form-control recipes-input ${errors.description ? "is-invalid" : ""}`}
            placeholder="Description *"
            rows={4}
          ></textarea>
          {errors.description && <div className="invalid-feedback d-block">{errors.description.message}</div>}
        </div>

        {/* File Upload - Drag & Drop style */}
        <div className="mb-4 mt-5">
          <label className="recipes-file-upload w-100 p-2">
            <input type="file" {...register("recipeImage")} className="d-none" accept="image/*" />
            
            {imagePreview ? (
              <img src={imagePreview} alt="preview" className="w-100 rounded-2" style={{ height: "130px", objectFit: "contain" }} />
            ) : (
              <div className="recipes-file-upload-inner">
                <i className="fa-solid fa-upload fs-3 mb-2 text-success"></i>
                <div className="text-center mt-2">
                  <span className="text-dark fw-medium">Drag & Drop or </span>
                  <span className="text-success fw-bold" style={{ cursor: "pointer" }}>Choose an Item Image</span>
                  <span className="text-dark fw-medium"> to Upload</span>
                </div>
              </div>
            )}
          </label>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-3 pt-3 flex-column flex-sm-row">
          <button
            onClick={() => navigate("/dashboard/recipes")}
            type="button"
            className="btn btn-outline-success px-5 py-2 fw-semibold border-2 btn-responsive"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success px-5 py-2 fw-semibold text-white btn-responsive">
            Save
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
