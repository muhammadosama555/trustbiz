import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";

// get businesses

const getBusinesses = async (currentPage=1,search="",categories=[],sortBy="",maxRating=5) => {
    // Convert the categories array to a formatted string
    const formattedCategories = categories.join(',');
   let url = `${API_BASE_URL}/businesses?page=${currentPage}&search=${search}&sortBy=${sortBy}&maxRating=${maxRating}`;
   if (categories.length > 0) {
       url = `${API_BASE_URL}/businesses?page=${currentPage}&search=${search}&categories=${formattedCategories}&sortBy=${sortBy}&maxRating=${maxRating}`;
   }
    console.log(url); // Log the URL before making the request
   return await axios.get(url)
 }
 
 export const useGetBusinesses = (currentPage,search,categories,sortBy,maxRating) => {
   return useQuery(['businesses',currentPage,search,categories,sortBy,maxRating], () => getBusinesses(currentPage,search,categories,sortBy,maxRating))
 }

// get business details

const getBusinessDetails = async (businessId) => {
    const currentUser = store.getState().userSlice.currentUser;
    const token = currentUser ? currentUser.token : null;
    return axios.get(`${API_BASE_URL}/businesses/${businessId}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
  };
  
  export const useGetBusinessDetails = (businessId) => {
    return useQuery(["business",businessId], () => {
        return getBusinessDetails(businessId);
    });
  };

  // create business

export const createBusiness = async (businessData) => {
  console.log(businessData)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.post(`${API_BASE_URL}/businesses`, businessData, {
    headers: {
      authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useCreateBusiness = () => {
  const navigate = useNavigate();
  return useMutation(createBusiness, {
    onSuccess: (data) => {
      navigate("/");
    },
  });
};

// delete business

export const deleteBusiness = async (businessId) => {
  console.log(businessId)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.delete(`${API_BASE_URL}/businesses/${businessId}`,{
    headers:{
      'authorization':"Bearer "+ token
    }
  });
}

export const useDeleteBusiness = () => {
  const queryClient = useQueryClient()
return useMutation(deleteBusiness,{
  onSuccess: (data) => {
    queryClient.invalidateQueries('businesses');
  
  },
})
}


// update business

export const updateBusiness = async (businessData) => {
  
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.put(`${API_BASE_URL}/businesses/${businessData.businessId}`, businessData, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useUpdateBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation(updateBusiness, {
    onSuccess: (data) => {
   
      queryClient.invalidateQueries("business");

    },
  });
};