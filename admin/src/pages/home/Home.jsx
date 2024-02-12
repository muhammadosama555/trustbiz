import { useGetBusinesses } from "../../apiCalls/businessApiCalls";
import { useGetReviews } from "../../apiCalls/reviewApiCalls";
import { useGetUsers } from "../../apiCalls/userApiCalls";
import Loader from "../../components/Loader";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
 


export default function Home() {

  const {isLoading:isUsersLoading, data:users, isError:isUsersError, error:usersError} = useGetUsers()
  const {isLoading:isBusinessesLoading, data:businesses, isError:isBusinessesError, error:businessesError} = useGetBusinesses()
  const {isLoading:isReviewsLoading, data:reviews, isError:isReviewsError, error:reviewsError} = useGetReviews()

  if (isUsersLoading) {
    return <Loader/>
  }
  
  if (isUsersError) {
    return <h2>{usersError.message}</h2>
  }

  if (isBusinessesLoading) {
    return <Loader/>
  }
  
  if (isBusinessesError) {
    return <h2>{businessesError.message}</h2>
  }

  if (isReviewsLoading) {
    return <Loader/>
  }
  
  if (isReviewsError) {
    return <h2>{reviewsError.message}</h2>
  }

  return (
    <div className="home">
      <FeaturedInfo
      users={users}
      businesses={businesses}
      reviews={reviews}
      />
    </div>
  );
}
