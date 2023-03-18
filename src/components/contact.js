/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Layout from './layout';
import "firebase/firestore";
import { faYoutube, faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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


const Contact = () => {
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

  return (
    <Layout>
    <div>
      <section className="bg-white">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-800 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
      <form action="#" className="space-y-8" onSubmit={handleSubmit} >
          <div>
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">Your email</label>
              <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="rochi@gmail.com" required 
                name="email"
                value={formData.email}
                onChange={handleChange}/>
          </div>
          <div>
              <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">Subject</label>
              <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500  dark:border-gray-600 dark:placeholder-gray-400b dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required 
               name="name"
               value={formData.name}
               onChange={handleChange}
              />
          </div>
          <div className="sm:col-span-2">
              <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800">Your message</label>
              <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
          </div>
          <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-gray-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
      </form>
  </div>
  <div className="w-full md:px-[300px] h-96 mb-8">
      <iframe
        className="w-full  h-full  rounded-md "
        src={`https://www.google.com/maps/embed/v1/place?q=South+Africa+siloam&key=AIzaSyBBF2LUyxHiz9HrBH6sSwXOz2EbN_SQJMM`}
        allowfullscreen=""
        loading="lazy"
        title="map"
      ></iframe>
     
    </div>
    <h1 className="md:px-[300px] font-extrabold  text-2xl ">Follow me on:</h1>
     <div className="flex md:px-[300px] justify-left items-left space-x-4 py-4">
        <a href="https://www.youtube.com/channel/UCKiw9otIrxpiJEL8Icr072A" >
          <FontAwesomeIcon icon={faYoutube} size="2x" />
        </a>
        <a href="https://twitter.com/footballlz" >
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://web.facebook.com/rotshidzwa.mavhungu.5" >
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a href="https://web.facebook.com/rotshidzwa.mavhungu.5" >
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
    </div>
</section>


</div>
    </Layout>
  )
}

export default Contact


