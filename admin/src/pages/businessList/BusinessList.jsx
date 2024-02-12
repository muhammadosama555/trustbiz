import "./businessList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Loader from '../../components/Loader'
import { Link } from "react-router-dom";
import { useDeleteBusiness, useGetBusinesses } from "../../apiCalls/businessApiCalls";

export default function BusinessList() {
  const {isLoading:isBusinessesLoading, data:businesses, isError:isBusinessesError, error:businessesError} = useGetBusinesses()
  const {mutate:deleteBusinessMutate, isLoading:isDeleteBusinessLoading, isError:isDeleteBusinessError, error:deleteBusinessError} = useDeleteBusiness();
  console.log(businesses?.data)
  if (isBusinessesLoading) {
    return <Loader/>
  }
  
  if (isBusinessesError) {
    return <h2>{businessesError.message}</h2>
  }

  if (isDeleteBusinessLoading) {
    return <Loader/>
  }
  
  if (isDeleteBusinessError) {
    return <h2>{deleteBusinessError.message}</h2>
  }
  
    const handleDelete = (businessId) => {
      deleteBusinessMutate(businessId)
    };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "averageRating",
      headerName: "Rating",
      width: 160,
    },
    {
      field: "reviews",
      headerName: "Reviews",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/business/" + params.row._id + "/reviews"}>
              <button className="productListEdit">View</button>
            </Link>
           
          </>
        );
      },
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
      <DataGrid
        rows={businesses.data.businesses}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
