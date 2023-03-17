import React, { useState, useEffect } from 'react';
import Layout from './layout';
import { faYoutube, faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { motion } from "framer-motion";

const About = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const res = await axios.get("https://api.pexels.com/v1/popular", {
        headers: {
          Authorization: "qdTkwSXf8kr1yFEmAUhO1lRwRZVBGMJcMccjwHwEmao3Xo1kqnTOHLUU",
        },
        params: {
          per_page: 5,
        },
      });
      setPhotos(res.data.photos);
    };
    fetchPhotos();
  }, []);
 
  return (
    <Layout>
 <div className="flex flex-col md:flex-row items-center justify-center py-16 md:py-20">
      <div className="flex-1 p-8 ">
        <h1 className="text-5xl  md:text-7xl font-bold mb-8">Hi!I’m mooney:) let’s go travel</h1>
        <p className="mb-8 text-xl">Randomised words <b>which don't look even slightly believable.</b> If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden.</p>
        <p className="mb-4 text-lg">It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.k.</p>
       <div className="flex justify-left items-left space-x-4 py-12">
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
    </div></div>
     
      <div className="flex-1 p-8 w-full ">
      <div style={{ border: "1px solid #ccc", borderRadius: "10px" }}>
  <iframe 
    src="https://www.youtube.com/embed/Yvwfzr02ejo?autoplay=1&loop=1" 
    className=" h-[400px]  w-full"
    frameborder="0" 
    //allow="autoplay; encrypted-media" 
    allowfullscreen
    title="youtube vid"
    style={{ border: "1px solid #ccc", borderRadius: "10px" }}
  />
</div>
    <div className="py-4">
<blockquote className="border-l-8 border-gray-900 pl-4 py-2">
  <p className="mb-2 text-xl">It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything.</p>
  <br/>
  <strong className="py-4 text-xl">- Calvin Coolidge</strong>
</blockquote>
</div>
      </div>
     

    </div>
    <div  className="bg-gray-100 ">
    <div className="bg-gray-100 p-8 py-32 text-center max-w-screen-lg mx-auto">
  <p className="text-3xl md:text-4xl font-medium mb-4">
    Also the leap into electronic typesetting, remaining essentially unchanged.
    It has survived not only five centuries but also.
  </p>
  <p className="text-lg  md:text-base font-light text-gray-500">
    - Calvin Coolidge
  </p>
</div>
</div>
<div className="text-center text-3xl font-extrabold py-32">
<h1 className="underline mb-8"> @Blogie </h1>
<div className="flex flex-wrap justify-center py-4 border-y-4 ">
    
      {photos.map((photo) => (
      <div className="w-1/2 sm:w-1/4 md:w-1/5 p-4" key={photo.id}>
      <motion.img
        className="w-full h-[200px] rounded-lg shadow-lg object-cover"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        src={photo.src.medium}
        alt={photo.photographer}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
    </div>
      ))}
    </div>
    </div>
    </Layout>
  )
}

export default About