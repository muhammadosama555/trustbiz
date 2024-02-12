import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { useQueryClient } from 'react-query'
import { API_BASE_URL } from "../config";
import { store } from "../redux/store";

// get businesses

const getReviews = async () => {

 return await axios.get(`${API_BASE_URL}/reviews`)
}

export const useGetReviews = () => {
 return useQuery('reviews', () => getReviews())
}

// get review details

const getReviewDetails = async (reviewId) => {
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.get(`${API_BASE_URL}/reviews/${reviewId}`, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useGetReviewDetails = (reviewId) => {
  return useQuery(["review",reviewId], () => {
      return getReviewDetails(reviewId);
  });
};

// delete review

export const deleteReview = async (reviewId) => {
  console.log(reviewId)
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.delete(`${API_BASE_URL}/reviews/${reviewId}`,{
    headers:{
      'authorization':"Bearer "+ token
    }
  });
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()
return useMutation(deleteReview,{
  onSuccess: (data) => {
    queryClient.invalidateQueries('business');
  
  },
})
}


// update review

export const updateReview = async (reviewData) => {
  
  const currentUser = store.getState().userSlice.currentUser;
  const token = currentUser ? currentUser.token : null;
  return axios.put(`${API_BASE_URL}/reviews/${reviewData.reviewId}`, reviewData, {
    headers: {
      authorization: "Bearer " + token,
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation(updateReview, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("review")
    },
  });
};