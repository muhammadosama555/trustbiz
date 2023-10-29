import Business from "./Business";
import Loader from "./Loader";
import { useGetBusinesses } from "../apiCalls/businessApiCalls";


function Businesses() {
  
  const { isLoading: isBusinessesLoading, data: businesses } = useGetBusinesses()
console.log(businesses?.data)
  return (
    <>
      {isBusinessesLoading ? (
        <Loader />
      ) : (
        <>
          <div className="businesses my-10 py-10">
            <h1 className="text-4xl text-center">Featured Businesses</h1>
            <div className="mx-10 mt-10 flex gap-10 items-center justify-center">
              {
                businesses.data.businesses.map((business) => (
                  <Business key={business._id} business={business} />
                ))}
            </div>
            
          </div>
        </>
      )}
    </>
  );
}

export default Businesses;
