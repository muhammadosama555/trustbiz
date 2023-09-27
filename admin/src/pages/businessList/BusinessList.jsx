import "./businessList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteBusiness, getBusinesses } from "../../redux/apiCalls/businessApiCalls";

export default function BusinessList() {

  const {businessData} = useSelector(
    (state) => state.businessSlice
  );

  const dispatch = useDispatch()

  useEffect(()=>{
    getBusinesses(dispatch)
    },[dispatch])

    const handleDelete = (id) => {
      console.log(id);
       DeleteBusiness(dispatch,id)
       
      };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Business",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img[0]?.url} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "categories", headerName: "Categories", width: 200 },
    {
      field: "owner",
      headerName: "Owner",
      width: 120,
    },
    {
      field: "city",
      headerName: "City",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/business/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div style={{ padding: "10px 0px" }}>
        <Link to="/newBusiness">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={businessData.business}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
