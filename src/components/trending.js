import React from "react";
import { motion } from 'framer-motion';
const Card = ({ title, category, date, imageUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <motion.img className="w-full mb-4 rounded-md" src={imageUrl} alt={title}
      whileHover={{ scale: 1.1 }} />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-500 text-sm mb-2">{category}</p>
      <p className="text-gray-500 text-sm">{date}</p>
    </div>
  );
};

const App = () => {
  return (
    <div className="container mx-auto py-10">
    <h1 className="text-4xl text-left font-bold mb-8">Trending</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          title="20 Reasons You Need to Stop Stressing About Travel"
          category="Lifestyle"
          date="February 9, 2023"
          imageUrl="https://assets.website-files.com/63d6118fac19915fe3a7b107/63e51c0485640e06e621e98e_blog-07-p-500.jpg"
        />
        <Card
          title="10 Sites to Help You Become an Expert in Travel"
          category="Social"
          date="February 9, 2023"
          imageUrl="https://assets.website-files.com/63d6118fac19915fe3a7b107/63e51b56decf1b2517eaa7e9_blog-06-p-500.jpg"
        />
        <Card
          title="Travel: It's Not as Difficult as You Think"
          category="Music"
          date="February 9, 2023"
          imageUrl="https://assets.website-files.com/63d6118fac19915fe3a7b107/63e51aeac99be3a7b8f6e812_blog-05-p-500.jpg"
        />
        <Card
          title="10 Things Everyone Hates About Blog"
          category="Music"
          date="February 9, 2023"
          imageUrl="https://assets.website-files.com/63d6118fac19915fe3a7b107/63d6a035d504155c78c948db_blog-04-p-500.jpg"
        />
      </div>

        <div className="bg-gray-100 p-10">
     <h1 className="text-3xl font-bold mb-4">Ready to grow your business?</h1>
     <p className="text-lg mb-4">
       It is a long established fact that a reader will be distracted.
     </p>
     <div className="flex flex-col md:flex-row justify-center items-center">
     <form className="search relative justify-center items-center"action="https://getform.io/f/8f58c1a7-a3d4-4ea6-8a36-96c8a17f75fb"
        method="POST">
      <input
        className="field-input search-input w-input block rounded-lg bg-transparent border text-lg text-black  border-gray-300 shadow-sm placeholder-gray-400 py-2 px-8 md:py-5  md:px-48 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        type="email"
        placeholder="Enter email here"
        required
      />
      <button
        className="button search-button w-button absolute top-0 right-0 h-full md:px-16 px-8 py-2 text-white bg-gray-800 hover:bg-black rounded-lg"
        type="submit"
      >
         Sign Up
      </button>
    </form>
     </div>
   </div>
    </div>
   
  );
};

export default App;
