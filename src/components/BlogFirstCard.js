import React from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const SpaceflightNewsCard = ({ article }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <motion.div
      key={article.id}
      className="border border-gray-400 p-4 rounded-lg overflow-hidden shadow-md"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col md:flex-row">
        <img
          src={article.imageUrl}
          alt={article.title}
          className={`w-full ${isMobile ? 'mb-2' : 'md:w-1/3 object-cover mb-2 md:mb-0 md:mr-4'}`}
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Category:</span> {article.category}<br />
              <span className="font-bold">Date posted:</span> {new Date(article.publishedAt).toLocaleDateString()}
            </p>
          </div>
          <a href={article.url} className="text-blue-500 hover:underline">Read More</a>
        </div>
      </div>
    </motion.div>
  );
};

export default SpaceflightNewsCard;
