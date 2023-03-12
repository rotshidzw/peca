import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const NewsCards = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(
        'https://newsapi.org/v2/everything?q=keyword&apiKey=798e568c8f0844d480d811eab603dbba'
      );
      setArticles(response.data.articles.slice(0, 2));
    };
    fetchArticles();
  }, []);

  const handleArticleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-20">
      {articles.map((article) => (
        <div
          key={article.url}
          className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
          style={{ height: '480px' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleArticleClick(article.url)}
        >
          <motion.img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-2/3 object-cover"
            style={{ height: '320px' }}
            whileHover={{ scale: 1.1 }}
          />
          <div className="p-6" style={{ height: '160px' }}>
            <h2 className="font-bold text-xl mb-2">{article.title}</h2>
            <div className="flex items-center mt-4">
              <div className="text-sm">
                <p className="text-gray-900 leading-none font-bold hover:text-slate-900">{article.author} {new Date(article.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCards;
