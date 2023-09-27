import { Link, useLocation } from "react-router-dom";
import "./business.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessesDetails, updateBusiness } from "../../redux/apiCalls/businessApiCalls";
import { useEffect, useState } from "react";
import { updateBusinessReset } from "../../redux/reducers/businessReducers";

export default function Business() {

    const [formData,setFormData] = useState({})
    const location = useLocation();
    const id = location.pathname.split("/")[2];
  
    const { businessDetails,isUpdated } = useSelector(
      (state) => state.businessSlice
    );
   
    const businessData = businessDetails.business
    const dispatch = useDispatch();
  
  
    useEffect(() => {
      getBusinessesDetails(dispatch, id);
      console.log(businessDetails,id);
      if (isUpdated) {
        dispatch(updateBusinessReset());
      }
    }, [dispatch,isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();
        updateBusiness(dispatch, formData, id);
      };
    
      const handleFileChange = (event) => {
        setFormData({ ...formData, photo: event.target.files[0] });
      };

      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Business</h1>
        <Link to="/newbusiness">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={businessData.img[0]?.url} alt="" className="productInfoImg" />
                  <span className="productName">{businessData.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{businessData._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Description:</span>
                      <span className="productInfoValue">{businessData.desc}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Categories:</span>
                      <span className="productInfoValue">{businessData.categories}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Address:</span>
                      <span className="productInfoValue">{businessData.address}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">City:</span>
                      <span className="productInfoValue">{businessData.city}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Country:</span>
                      <span className="productInfoValue">{businessData.country}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Owner:</span>
                      <span className="productInfoValue">{businessData.owner}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Rating:</span>
                      <span className="productInfoValue">{businessData.rating}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">no Of Reviews:</span>
                      <span className="productInfoValue">{businessData.reviews.length}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm" onSubmit={submitHandler}>
              <div className="productFormLeft">
                  <label>Business Name</label>
                  <input type="text"
                   placeholder="Apple AirPod"
                   name="title"
                   onChange={handleInputChange}
                    />
                  <label>Description</label>
                  <input type="text"
                   placeholder="Apple AirPod are the best"
                   name="desc"
                   onChange={handleInputChange}
                    />
                  <label>Address</label>
                  <input type="text"
                   placeholder="islamabad street 11"
                   name="address"
                   onChange={handleInputChange}
                    />
                  <label>City</label>
                  <input type="text"
                   placeholder="Rawalpindi"
                   name="city"
                   onChange={handleInputChange}
                    />
                  <label>Country</label>
                  <input type="text"
                   placeholder="pakistan"
                   name="country"
                   onChange={handleInputChange}
                    />
                  
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={businessData.img[0]?.url} />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file"
                       id="file"
                        style={{display:"none"}}
                        name="img"
                        onChange={handleFileChange}
                         />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
