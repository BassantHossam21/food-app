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
  //Compare between edit and add
  const { id } = useParams();
  console.log(id);

  let {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const appendToFormData = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagId", data.tagId);
    formData.append("price", data.price);
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
        }
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
        }
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
        }
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
        }
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
        "https://upskilling-egypt.com:3006/api/v1/tag/"
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
        title={"Fill the Recipes !"}
        to="/dashboard/recipes"
        buttonText="All Recipes"
      />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className=" w-75 m-auto  p-5">
        <input
          type="text"
          {...register("name", { required: "Recipe Name is required" })}
          className="form-control my-2"
          placeholder="Recipe Name"
          aria-label="Recipe Name"
          aria-describedby="addon-wrapping"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}

        <select
          {...register("tagId", { required: "Tag is required" })}
          className="form-select my-2"
        >
          <option value="">Tag</option>
          {tagsList.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        {errors.tagId && <p className="text-danger">{errors.tagId.message}</p>}

        <input
          type="number"
          {...register("price", { required: "Price is required" })}
          className="form-control my-2"
          placeholder=" Recipe Price"
          aria-label="Recipe Price"
          aria-describedby="addon-wrapping"
        />
        {errors.price && <p className="text-danger">{errors.price.message}</p>}

        <select {...register("categoriesIds")} className="form-select my-2">
          <option value="">Category</option>
          {categoriesList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <textarea
          {...register("description", { required: "Description is required" })}
          className="form-control my-2"
          placeholder=" Recipe Description"
        ></textarea>
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}

        <input
          type="file"
          {...register("recipeImage")}
          className="form-control my-2"
          placeholder="Recipe file"
          aria-label="Recipe file"
          aria-describedby="addon-wrapping"
        />

        <div className="btns d-flex justify-content-end">
          <button type="submit" className="btn btn-success mx-2">
            Save
          </button>
          <button
            onClick={() => navigate("/dashboard/recipes")}
            type="button"
            className="btn btn-outline-success mx-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
