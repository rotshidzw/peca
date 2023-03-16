/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Link } from 'react-router-dom';

import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8r87GlgZZ33PO2Fu_cDP-Tb6VtIGMHG4",
  authDomain: "deft-epoch-379213.firebaseapp.com",
  projectId: "deft-epoch-379213",
  storageBucket: "deft-epoch-379213.appspot.com",
  messagingSenderId: "18023085670",
  appId: "1:18023085670:web:967b368b4e9bc80f8a5fa7",
  measurementId: "G-ZSB9NMLQZJ"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
 
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await db.collection("myCollection").add({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
  
      setFormData({
        name: '',
        email: '',
        message: '',
      });
  
      alert("Form submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error submitting form!");
    }
  };
  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    setShowForm(false);
  };
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
              
              <Link  to="/"
                className="  text-black px-3 py-2  hover:underline text-xl font-medium"
              >
                Home
              </Link>

              <Link to="/blog" className="text-black hover:underline px-3 py-2 text-xl font-medium">
              Blog
             </Link>

              <Link to="/about"
                className="text-black  hover:underline px-3 py-2  text-xl font-medium"
              >
                About
              </Link>
            
              <Link to="/contact"
        className="block px-4 py-2 text-black font-semibold hover:underline text-xl   focus:outline-none"
      >
        Contact
      </Link>
    
         
             
            </div>
           

          </div>
        </div>
        <div>
      <button
        className="bg-gray-800 shadow-xl hidden hover:bg-black rounded-lg lg:block text-white font-bold py-3 px-8"
        onClick={() => setShowForm(true)}
      >
        Contact Us
      </button>
      {showForm && (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg  md:px-32">
          <h2 className="text-xl font-bold mb-4">Sign In</h2>
          <div className="mb-4">
            <label className="block text-left text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-left text-gray-700 font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="border rounded w-full py-2 md:px-20 px-6 text-gray-700"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-gray-900 hover:bg-black text-white py-3 px-10 rounded"
              type="submit"
            >
              Sign In
            </button>
          </div>
          <button className="absolute top-0 right-0 m-4 text-2xl bg-gray-900 text-white py-2 px-4 rounded" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </form>
          
        </div>
      )}
    </div>
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