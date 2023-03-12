/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { motion } from 'framer-motion';



const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (

    <nav className="bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
          <div className="flex items-center justify-between h-16">
   
          <div className="flex items-center">
             <div className="flex">
            <img
              className="h-16 w-16 md:h-32 md:w-32"
              src="https://assets.website-files.com/63d5ec0c84ce7a139b04638e/63e6fae264e26f6039829955_beog.svg"
              alt="Workflow"
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-36 flex text-center space-x-12">
              <a href="#"
                className="  text-black px-3 py-2  hover:underline text-xl font-medium"
              >
                Home
              </a>

              <a href="#"
                className="text-black  hover:underline px-3 py-2  text-xl font-medium"
              >
                Blog
              </a>

              <a href="#"
                className="text-black  hover:underline px-3 py-2  text-xl font-medium"
              >
                About
              </a>
             <div className="relative">
               <button
        className="block px-4 py-2 text-black font-semibold hover:underline text-xl   focus:outline-none"
      >
        Contact
      </button>
    
         </div>
             
            </div>
           

          </div>
        </div>
         <button class="bg-gray-800 shadow-xl hover:bg-black hidden rounded-lg lg:block text-white font-bold py-3 px-8 ">
        Contact Us
</button>
        <div className="-mr-2 flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="bg-black inline-flex items-auto justify-auto p-2  text-white rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-black"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>

    <Transition
  show={isOpen}
  enter="transition ease-out duration-100 transform"
  enterFrom="opacity-0 scale-95"
  enterTo="opacity-100 scale-100"
  leave="transition ease-in duration-75 transform"
  leaveFrom="opacity-100 scale-100"
  leaveTo="opacity-0 scale-95"
>
  {(ref) => (
    <motion.div
      className="lg:hidden border-t-2 border-b-2 border-gray-500"
      id="mobile-menu"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      ref={ref}
    >
      <div className="px-2  text-left pt-2 pb-3 space-y-0 lg:px-3">
        <a href="#"
          className="text-black block hover:underline px-3 py-2  text-xl font-medium"
        >
          Home
        </a>

        <a href="#"
          className="text-black  hover:underline block px-3 py-2  text-xl font-medium"
        >
          Blog
        </a>

        <a href="#"
          className="text-black  hover:underline block px-3 py-2  text-xl font-medium"
        >
         About
        </a>

        <a href="#"
          className="text-black  hover:underline block px-3 py-2  text-xl font-medium"
        > Contact
        
        </a>
      </div>
    </motion.div>
  )}
</Transition>
  
  </nav>

  )
}

export default Nav