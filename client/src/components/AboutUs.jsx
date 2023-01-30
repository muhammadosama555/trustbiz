import React from 'react'

function AboutUs() {
  return (
    <div className="about my-10">
        <h1 className="text-5xl text-center">About Us</h1>
        <div className="mx-20 flex gap-10 my-10 items-center justify-center">
            <div className="left rounded-xl bg-cover bg-center  overflow-hidden w-2/3 h-[600px]"
                Style="background-image: url('assets/about.jpeg');">

                <div
                    className="bg-gray-900 z-10 w-full h-full bg-opacity-40 text-white text-center items-center flex justify-around text-5xl ">
                    Our Business</div>

            </div>
            <div className="right w-1/3">
                <p className="text-gray-700 text-lg font-light">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Soluta placeat nisi itaque suscipit quia
                    in,
                    facere repudiandae eligendi ducimus autem ex laboriosam voluptate. Architecto itaque, in animi
                    facilis
                    labore, provident pariatur sed cumque qui, neque possimus corporis ea quae eos cupiditate dolore
                    libero
                    at et! Odit animi atque debitis, impedit aperiam quod nam maiores recusandae consequuntur doloremque
                    saepe quaerat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos est cum laudantium
                    expedita dolore enim, rm rerum eligendi neque quis atque consequuntur asperiores veritatis facere.
                    Voluptate consequatur quo reprehenderit recusandae inventore maxime praesentium optio soluta eveniet
                    deleniti eligendi repudiandae, vitae reiciendis illo. Officia a voluptas eveniet accusamus!
                    Voluptatibus pariatur facilis in atque quam ea, debitis recusandae quidem harum dicta eligendi nemo
                    ipsum reiciendis provident aperiam reprehenderit illo numquam ?</p>
            </div>
        </div>
    </div>
  )
}

export default AboutUs