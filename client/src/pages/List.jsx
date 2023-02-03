import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBusinesses, postBusinesses } from "../redux/apiCalls/businessApiCalls";
import { updateReset } from "../redux/reducers/businessReducers";

function List() {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const alert = useAlert();
  const Navigate = useNavigate();

  const {loading, error, isUpdated } = useSelector(
    (state) => state.businessSlice
  );

  useEffect(() => {
    if (error) {
      alert.error("business details incompelete");
    }
    if (isUpdated) {
        alert.success("new business is added sucessfully")
        Navigate('/')
        dispatch(updateReset())
    }
  }, [error, alert,isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();
    postBusinesses(dispatch, formData);

  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, photo: event.target.files[0] });
  };

  const handleTextChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="list-a-business mx-32 mt-10 flex flex-col items-center pb-10">
      <h1 className="w-full text-4xl">List a business</h1>
      <form className=" mt-14 w-2/3">
        <div className="flex gap-10 mb-5">
          <div className="flex flex-col gap-2 w-1/3">
            <label className="text-xl pl-1" htmlFor="title">
              Title
            </label>
            <input
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="title"
              name="title"
              defaultValue={title}
              onChange = {handleTextChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <label className="text-xl pl-1" htmlFor="category">
              Category
            </label>
            <input
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="categories"
              name="categories"
              defaultValue={categories}
              onChange = {handleTextChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <label className="text-xl pl-1" htmlFor="image">
              Image
            </label>
            <div className="relative">
              <input
                className="absolute w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
                type="file"
                id="img"
                name="img"
                defaultValue={image}
                onChange={handleFileChange}
              />
              <i className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-600 fa-solid fa-paperclip"></i>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xl pl-1" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="desc"
              name="desc"
              defaultValue={desc}
              onChange = {handleTextChange}
            ></textarea>
          </div>
        </div>
        <div className="mb-5">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xl pl-1" htmlFor="Address">
              Address
            </label>
            <input
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="address"
              name="address"
              defaultValue={address}
              onChange = {handleTextChange}
            />
          </div>
        </div>
        <div className="flex gap-10 mb-5">
          <div className="flex flex-col gap-2 w-1/3">
            <label className="text-xl pl-1" htmlFor="City">
              City
            </label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="city"
              name="city"
              defaultValue={city}
              onChange = {handleTextChange}
            >
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Karachi">Karachi</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-1/3">
            <label className="text-xl pl-1" htmlFor="Country">
              Country
            </label>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="country"
              name="country"
              onChange = {handleTextChange}
            >
              <option value="Pakistan">Pakistan</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Pakistan">Pakistan</option>
            </select>
          </div>
          <div className="w-1/3"></div>
        </div>
        <div>
          <h1 className="text-xl mb-2 pl-1">Status</h1>
          <div className="flex gap-10 pl-1">
            <div className="text-lg">
              <input type="radio" name="status" id="status" className="mr-3"  value="Active"
              onChange = {handleTextChange} />
              Active
            </div>
            <div className="text-lg ">
              <input type="radio" name="status" id="status" className="mr-3"  value="Inactive"
              onChange = {handleTextChange} />
              Inactive
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end py-5">
          <button className="text-base text-center  font-normal nav-link bg-slate-200 px-6 py-2 rounded-lg btn hover:drop-shadow-sm" onClick={submitHandler}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default List;
