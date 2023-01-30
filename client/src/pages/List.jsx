import React from 'react'


function List() {

  return (
    <div className="list-a-business mx-32 mt-10 flex flex-col items-center pb-10">
    <h1 className="w-full text-4xl">List a business</h1>
    <form className=" mt-14 w-2/3">
        <div className="flex gap-10 mb-5">
            <div className="flex flex-col gap-2 w-1/3">
                <label className="text-xl pl-1" htmlFor="title">Title</label>
                <input className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50" type="text" id="title" name="title"
                    placeholder="Abc"/>
            </div>
            <div className="flex flex-col gap-2 w-1/3">
                <label className="text-xl pl-1" htmlFor="category">Category</label>
                <input className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50" type="text" id="category" name="category"
                    placeholder="Abc"/>
            </div>
            <div className="flex flex-col gap-2 w-1/3">
                <label className="text-xl pl-1" htmlFor="image">Image</label>
                <div className="relative">
                    <input className="absolute w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50" type="text" id="image" name="image"
                        placeholder="Abc"/>
                    <i className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-600 fa-solid fa-paperclip"></i> 
                </div>
            </div>
        </div>
        <div className="mb-5">
            <div className="flex flex-col gap-2 w-full">
                <label className="text-xl pl-1" htmlFor="description">Description</label>
                <textarea className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50" type="text" id="description" name="description"
                   placeholder="Abc"></textarea>
            </div>
        </div>
        <div className="mb-5">
            <div className="flex flex-col gap-2 w-full">
                <label className="text-xl pl-1" htmlFor="Address">Address</label>
                <input className="w-full px-4 py-2 placeholder:text-gray-300 rounded-md border border-gray-200 bg-gray-50" type="text" id="Address" name="Address"
                placeholder="Abc"/>
            </div>
        </div>
        <div className="flex gap-10 mb-5">
            <div className="flex flex-col gap-2 w-1/3">
                <label className="text-xl pl-1" htmlFor="City">City</label>
                <select className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50" type="text" id="Country" name="Country"
                    placeholder="Abc">
                    <option value="">Pindi</option>
                    <option value="">Pindi</option>
                    <option value="">Pindi</option>
                </select>
            </div>
            <div className="flex flex-col gap-2 w-1/3">
                <label className="text-xl pl-1" htmlFor="Country">Country</label>
                <select className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50" type="text" id="Country" name="Country"
                    placeholder="Abc">
                    <option value="">Pakistan</option>
                    <option value="">Pakistan</option>
                    <option value="">Pakistan</option>
                </select>
            </div>
            <div className="w-1/3"></div>
        </div>
        <div>
            <h1 className="text-xl mb-2 pl-1">Status</h1>
            <div className="flex gap-10 pl-1">
                <div className="text-lg"><input type="radio" name="Active" id="Active" className="mr-3"/>Active</div>
                <div className="text-lg "><input type="radio" name="Active" id="Active" className="mr-3"/>Inactive</div>
            </div>
        </div>
        <div className="w-full flex justify-end py-5">
            <button className="text-base text-center  font-normal nav-link bg-slate-200 px-6 py-2 rounded-lg btn hover:drop-shadow-sm">Save</button>
        </div>
    </form>
</div>
  )
}

export default List