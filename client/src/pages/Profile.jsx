import React, { useRef } from "react";
import { useSelector } from "react-redux";
import ProfileBusiness from "../components/ProfileBusiness";
import { useGetUserDetails, useUpdateProfile, useUpdateUserImage } from "../apiCalls/userApiCalls";
import Loader from "../components/Loader";


function Profile() {

  const usernameInputElement = useRef();
  const emailInputElement = useRef();
  const contactInputElement = useRef();

  const { currentUser } = useSelector(state => state.userSlice) || null
  const userId = currentUser.data._id


  const { isLoading: isUserLoading, data: userDetails } = useGetUserDetails(userId)
  const { mutate: updateUserImageMutate, isLoading: isUpdateUserImageLoading, isError: isUpdateUserImageError, error: updateUserImageError, } = useUpdateUserImage();
console.log(userDetails?.data)
  const {
      mutate: updateProfileMutate,
      isLoading: isUpdateProfileLoading,
      isError: isUpdateProfileError,
      error: updateProfileError,
    } = useUpdateProfile();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        username: usernameInputElement.current?.value,
        email: emailInputElement.current?.value,
        contact: contactInputElement.current?.value,
       userId : userId,
      };

      console.log(data)
      updateProfileMutate(data);
   
    };

    const handleFileChange = (e) => {
      const imageData = {
        userId: userId,
        image: e.target.files[0],
      };
      updateUserImageMutate(imageData);
    };


    const fallbackImage = '/assets/avatar.jpg';

  return (
    <>
    {isUserLoading ? <Loader/> : 
    <div className="profile mt-10">
      <div className="top-secton flex items-center gap-10 mx-32 relative mb-10">
        <div
          className="contact rounded-lg bg-cover w-72 h-80 overflow-hidden"
          style={{
            backgroundImage: `url("${userDetails.data.user?.imgUrl}"), url("${fallbackImage}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className="profile-desc space-y-6">
          <div className="flex flex-col gap-2 w-96">
            <label className="text-xl pl-1" >
              Name
            </label>
            <input
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="username"
              name="username"
              defaultValue={userDetails.data.user.username}
              ref={usernameInputElement}
           
            />
          </div>
          <div className="flex flex-col gap-2 w-96">
            <label className="text-xl pl-1" >
              Email
            </label>
            <input
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="email"
              name="email"
              defaultValue={userDetails.data.user.email}
              ref={emailInputElement}
           
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl pl-1" >
              Profile Picture
            </label>
              <input
                className="absolute w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
                type="file"
                    id="file"
                    accept="image/*"
                    // style={{ display: "none" }}
                    onChange={handleFileChange}
            
              />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl pl-1" >
              Contact
            </label>
            <input
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="contact"
              name="contact"
              defaultValue={userDetails.data.user.contact}
              ref={contactInputElement}
           
            />
          </div>
        </div>
        <button onClick={handleSubmit} className="absolute right-0 bottom-0 text-base text-center  font-normal nav-link bg-slate-200 px-7 py-2 rounded-lg btn hover:drop-shadow-sm">
          Save
        </button>
      </div>
      {userDetails.data.user.businesses.length > 0 ?
      <div className="bottom mx-32 pt-10">
        <h1 className="text-4xl">Businesses</h1>
        <div className="cards section mt-10 mb-20 flex flex-col gap-8">
        {userDetails.data.user.businesses.map((business) => (
          <ProfileBusiness key={business._id} business={business} />
        ))}
         
        </div>
      </div>:null}
    </div>}
    </>
  );
}

export default Profile;
