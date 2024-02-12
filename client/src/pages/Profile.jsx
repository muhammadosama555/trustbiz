import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ProfileBusiness from "../components/ProfileBusiness";
import { useChangePassword, useGetUserDetails, useUpdateProfile, useUpdateUserImage } from "../apiCalls/userApiCalls";
import Loader from "../components/Loader";
import Dialog from '@material-ui/core/Dialog';
import { MailOutlined, LockOutlined, VisibilityOff, Visibility, Close  } from '@mui/icons-material';
import { ArrowBackIos } from '@mui/icons-material';




function Profile() {

  const usernameInputElement = useRef();
  const emailInputElement = useRef();
  const contactInputElement = useRef();

  const oldPasswordInputElement = useRef();
  const newPasswordInputElement = useRef();

  const [openChangePassword, setOpenChangePassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

 

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
    const { mutate: changePasswordMutate, isLoading: isChangePasswordLoading, isError: isChangePasswordError, error: changePasswordError } = useChangePassword();




    const changePasswordHandler = (event) => {
      event.preventDefault();
      const data = {
        oldPassword: oldPasswordInputElement.current?.value,
        newPassword: newPasswordInputElement.current?.value,
  
      };
      changePasswordMutate(data);

    };
  
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

    const closeChangePasswordHandler = () => {
      setOpenChangePassword(false)
    }

    const handleToggleOldPassword = () => {
      setShowOldPassword(!showOldPassword);
  
    };
    const handleToggleNewPassword = () => {
  
      setShowNewPassword(!showNewPassword);
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
        <button onClick={handleSubmit} className="absolute right-60 bottom-0 text-base text-center  font-normal nav-link bg-slate-200 px-7 py-2 rounded-lg btn hover:drop-shadow-sm">
          Save
        </button>
        <button onClick={()=>setOpenChangePassword(true)} className="absolute right-0 bottom-0 text-base text-center  font-normal nav-link bg-slate-200 px-7 py-2 rounded-lg btn hover:drop-shadow-sm">
          Change Password
        </button>

        <Dialog open={openChangePassword} onClose={closeChangePasswordHandler}>
  <div className="p-4">
    <Close
      style={{ position: 'absolute', right: 10, top: 10 }}
      onClick={closeChangePasswordHandler}
    />
    
    <h1 className="text-lg font-semibold mb-4">Change Password</h1>

    <form onSubmit={changePasswordHandler}>
      {/* Old Password */}
      <div>
        <label htmlFor="oldPassword" className="font-medium">Old Password</label>
        <div className="bg-[#C7C7C7] rounded-xl py-4 px-5 flex gap-2 items-center">
          <LockOutlined />
          <input
            type={showOldPassword ? 'text' : 'password'}
            placeholder="Password"
            className="outline-none text-sm font-medium w-full bg-[#C7C7C7] text-black placeholder-black"
            name="oldPassword"
            ref={oldPasswordInputElement}
          />
          <div onClick={handleToggleOldPassword} className="hover:cursor-pointer">
            {showOldPassword ? <Visibility /> : <VisibilityOff />}
          </div>
        </div>
      </div>

      {/* New Password */}
      <div className="mt-4">
        <label htmlFor="newPassword" className="font-medium">New Password</label>
        <div className="bg-[#C7C7C7] rounded-xl py-4 px-5 flex gap-2 items-center">
          <LockOutlined />
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="New Password"
            className="outline-none text-sm font-medium w-full bg-[#C7C7C7] text-black placeholder-black"
            name="newPassword"
            ref={newPasswordInputElement}
          />
          <div onClick={handleToggleNewPassword} className="hover:cursor-pointer">
            {showNewPassword ? <Visibility /> : <VisibilityOff />}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button>
          Save
        </button>
      </div>
    </form>
  </div>
</Dialog>


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
