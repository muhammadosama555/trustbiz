import React from 'react'

function ContactUs() {
  return (
    <div className="contact rounded-xl bg-cover bg-center relative overflow-hidden mx-20 my-20  h-[650px]"
        Style="background-image: url('pics/Contacts-bg.jpg');">
        <div className="bg-zinc-100 z-10 w-full h-full bg-opacity-90 absolute"></div>
        <div className="flex w-full h-full">
            <div className="left w-1/2 h-full flex text-center items-center justify-center">
                <h1 className="z-20 absolute text-5xl font-medium text-gray-900">Get in Touch</h1>
            </div>
            <div className="right w-1/2 h-full flex justify-center items-center overflow-hidden">
                <div className="absolute z-30 contact-form h-[570px] w-[450px] rounded-xl p-5 bg-[#FCFCFC] bg-opacity-60">
                    <form className="flex flex-col gap-5 items-center justify-center">
                        <input className="px-4 py-2 w-full rounded-md dropShadow" type="text" placeholder="First Name" />
                        <input className="px-4 py-2 w-full rounded-md dropShadow" type="text" placeholder="Last Name" />
                        <input className="px-4 py-2 w-full rounded-md dropShadow" type="text"
                            placeholder="Enter Your Email" />
                        <input className="px-4 py-2 w-full rounded-md dropShadow" type="text" placeholder="Phone Number" />
                        <textarea className="px-4 py-2 w-full rounded-md resize-none grow" cols="20" rows="9"
                            placeholder="Message..."></textarea>
                        <button className="w-full cursor-pointer text-base text-center font-normal nav-link bg-slate-200 px-5 py-2 rounded-lg btn hover:drop-shadow-sm">Send
                            Message</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactUs