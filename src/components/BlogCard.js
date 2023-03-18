import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const SpaceflightNews = () => {
  const [news, setNews] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const apiKey = 'AIzaSyAbbXpzVK4jD_ILNRZLBhD89BSn3vu726k';
    const channelId = 'UCaXkIU1QidjPwiAYu6GcHjg';
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=12`;
    
    axios.get(url)
      .then(response => {
        setVideos(response.data.items);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://api.spaceflightnewsapi.net/v3/articles?_limit=50')
      .then(response => {
        setNews(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
 
  return (
    <div className="bg-white py-4 mx-auto">
    
      <div className="container mx-auto my-2 md:py-4">
        <div className="relative py-[280px] border rounded-md  mb-8">
          {videos.length > 0 &&
            // eslint-disable-next-line
            <iframe 
              src={`https://www.youtube.com/embed/${videos[0].id.videoId}`}
              className="absolute top-0 left-0 w-full h-full rounded-md border"
             
              allowFullScreen
            />
          }
        </div> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  my-16">
          {news.map(article => (
            <motion.div 
              key={article.id} 
              className=" bg-white border-gray-400 p-4 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
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
