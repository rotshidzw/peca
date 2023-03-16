import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const SpaceflightNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('https://api.spaceflightnewsapi.net/v3/articles?_limit=12')
      .then(response => {
        setNews(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
   
    <div className="bg-gray-200">
   <div className="container mx-auto my-4">
      <h1 className="text-3xl text-left md:text-4xl font-bold mb-2">Spaceflight News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {news.map(article => (
          <motion.div 
            key={article.id} 
            className="border bg-white border-gray-400 p-4 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            
            <a href={article.url} className="text-blue-500 hover:underline">Read More</a>
          </motion.div>
        ))}
      </div>
    </div>
    </div>

  );
};

export default SpaceflightNews;