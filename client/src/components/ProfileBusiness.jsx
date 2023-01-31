import React from 'react'

function ProfileBusiness() {
  return (
    <div className="card flex h-60 relative shadow rounded-xl overflow-hidden">
    <div
      className="contact rounded-l-lg bg-cover w-56 h-60 "
      Style="background-image: url('assets/profile1.jpg');"
    ></div>
    <div className="flex flex-col pl-10">
      <div className="desc">
        <h1 className="title text-3xl pt-6 font-medium">Title</h1>
        <h3 className="category pt-3">Category</h3>
        <h3 className="address pt-1">Address</h3>
      {/* ratings */}
      </div>
      <button className="active px-5 py-1 text-xs text-lime-600 border border-lime-500 absolute bottom-5 rounded-full bg-lime-200">
        Active
      </button>
    </div>
    <div className="buttons right-10 absolute bottom-4 flex gap-5">
      <button className="text-base text-center  font-normal nav-link px-10 py-2 rounded-lg bg-[#EEF6FF] hover:drop-shadow-sm">
        Edit
      </button>
      <button className="text-base text-center  font-normal nav-link px-6 py-2 rounded-lg btn hover:drop-shadow-sm">
        Preview
      </button>
    </div>
  </div>
  )
}

export default ProfileBusiness