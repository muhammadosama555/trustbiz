import "./newBusiness.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isPostedReset } from "../../redux/reducers/businessReducers";
import { postBusinesses } from "../../redux/apiCalls/businessApiCalls";


export default function NewBusiness() {

  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { isPosted } = useSelector((state) => state.businessSlice);

  const submitHandler = (e) => {
    e.preventDefault();
    postBusinesses(dispatch, formData);
    if (isPosted) {
      Navigate("/businesses");
      dispatch(isPostedReset());
    }
  };

  const handleFileChange = (event) => {
    setFormData({ ...formData, photo: event.target.files[0] });
  };

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Business</h1>
      <form className="addProductForm" onSubmit={submitHandler}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file"
           id="file"
           name="img"
           onChange={handleFileChange}
            />
        </div>
        <div className="addProductItem">
          <label>Business Name</label>
          <input type="text"
           placeholder="Apple Airpods"
           name="title"
           onChange={handleTextChange}
            />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text"
           placeholder="description"
           name="desc"
           onChange={handleTextChange}
            />
        </div>
        <div className="addProductItem">
          <label>Address</label>
          <input type="text"
           placeholder="address"
           name="address"
           onChange={handleTextChange}
            />
        </div>
        <div className="addProductItem">
          <label>City</label>
          <input type="text"
           placeholder="rawalpindi"
           name="city"
           onChange={handleTextChange}
            />
        </div>
        <div className="addProductItem">
          <label>Country</label>
          <input type="text"
           placeholder="pakistan"
           name="country"
           onChange={handleTextChange}
            />
        </div>
       
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
