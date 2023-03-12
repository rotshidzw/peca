import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const TrendingCards = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=798e568c8f0844d480d811eab603dbba'
      );
      setArticles(response.data.articles.slice(0, 6));
    };
    fetchArticles();
  }, []);

  const handleArticleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto mt-14">
      <h1 className="text-4xl text-left font-bold mb-8">Most Popular</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
      <div className="md:col-span-3">
  <div className="grid grid-cols-1 gap-6">
    {articles.slice(0, 3).map((article) => (
      <div
      key={article.url}
      className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer flex flex-row"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleArticleClick(article.url)}
    >
      <div className="w-1/2">
        <motion.img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-72 object-cover"
          whileHover={{ scale: 1.1 }}
        />
      </div>
      <div className="w-1/2 p-6">
        <div className="flex items-start justify-start">
          <div className="bg-blue-500 text-white font-bold text-sm px-2 py-1 rounded-md">
            {article.source.name}
          </div>
          <p className="text-gray-600 ml-2 text-sm">{new Date(article.publishedAt).toLocaleDateString()}</p>
        </div>
        <h2 className="font-bold text-xl mb-2 mt-16">{article.title}</h2>
        <div className="flex items-center mt-8">
          <p className="text-gray-900 leading-none font-bold hover:text-slate-900 mr-2">{article.author}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
    
    ))}
  </div>
</div>
        <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-6">
  {articles.slice(3, 5).map((article) => (
    <div
      key={article.url}
      className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => handleArticleClick(article.url)}
    >
      <div className="flex items-start justify-start">
        <div className="bg-blue-500 text-white font-bold text-sm px-2 py-1 rounded-md">
          {article.source.name}
        </div>
        <p className="text-gray-600 ml-2 text-sm">{new Date(article.publishedAt).toLocaleDateString()}</p>
      </div>
      <motion.img
        src={article.urlToImage}
        alt={article.title}
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.1 }}
      />
      <div className="p-6">
        <h2 className="font-bold text-xl mb-2">{article.title}</h2>
        <div className="flex items-center mt-4">
          <p className="text-gray-900 leading-none font-bold hover:text-slate-900 mr-2">{article.author}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  ))}
</div>
</div>
</div>
</div>
);
};
export default TrendingCards;
