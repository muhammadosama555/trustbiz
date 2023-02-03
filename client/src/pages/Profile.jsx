import React from "react";
import { useSelector } from "react-redux";
import ProfileBusiness from "../components/ProfileBusiness";


function Profile() {

  const {isFetching,currentUser} = useSelector(state=>state.userSlice)
  const user = currentUser.user
  console.log(user.username);

  return (
    <div className="profile mt-10">
      <div className="top-secton flex items-center gap-10 mx-32 relative mb-10">
        <div
          className="contact rounded-lg bg-cover w-72 h-80 overflow-hidden"
          Style="background-image: url('assets/profile.jpg');"
        ></div>
        <div className="profile-desc space-y-6">
          <div className="flex flex-col gap-2 w-96">
            <label className="text-xl pl-1" for="title">
              Title
            </label>
            <input
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="text"
              id="title"
              name="title"
              defaultValue={user.username}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl pl-1" for="title">
              Profile Picture
            </label>
              <input
                className="absolute w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
                type="file"
                id="img"
                name="img"
                defaultValue={user.img}
              />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xl pl-1" for="title">
              Contact
            </label>
            <input
              className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50"
              type="number"
              id="contact"
              name="contact"
              defaultValue={user.phoneNo}
            />
          </div>
        </div>
        <button className="absolute right-0 bottom-0 text-base text-center  font-normal nav-link bg-slate-200 px-7 py-2 rounded-lg btn hover:drop-shadow-sm">
          Save
        </button>
      </div>
      <div className="bottom mx-32 pt-10">
        <h1 className="text-4xl">Businesses</h1>
        <div className="cards section mt-10 mb-20 flex flex-col gap-8">
          <ProfileBusiness/>
          <ProfileBusiness/>
          <ProfileBusiness/>
          <ProfileBusiness/>
          <ProfileBusiness/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
