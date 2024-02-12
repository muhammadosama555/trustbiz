import "./reviewList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import Loader from '../../components/Loader'
import { Link, useParams } from "react-router-dom";
import { useGetBusinessDetails } from "../../apiCalls/businessApiCalls";
import { useDeleteReview } from "../../apiCalls/reviewApiCalls";

export default function ReviewList() {
  const { businessId } = useParams();

  const { isLoading: isBusinessLoading, data: businessDetails } =
    useGetBusinessDetails(businessId);
  const {mutate:deleteReviewMutate, isLoading:isDeleteReviewLoading, isError:isDeleteReviewError, error:deleteReviewError} = useDeleteReview();

  if (isBusinessLoading) {
    return <Loader/>
  }
  

  if (isDeleteReviewLoading) {
    return <Loader/>
  }
  
  if (isDeleteReviewError) {
    return <h2>{deleteReviewError.message}</h2>
  }
  
    const handleDelete = (reviewId) => {
      deleteReviewMutate(reviewId)
    };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "title",
      headerName: "Title",
      width: 350,
    },
    {
      field: "rating",
      headerName: "Ratings",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/review/" + params.row._id}>
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
        rows={businessDetails.data.business.reviews}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
