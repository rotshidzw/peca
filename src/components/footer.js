import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faTwitter, faInstagram, faGitSquare  } from "@fortawesome/free-brands-svg-icons";


function Footer() {
  return (
   
   <footer className="bg-gray-900 pt-10 pb-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4">
          <h4 className="text-3xl font-semibold text-white">Let's keep in touch!</h4>
          <h5 className="text-lg mt-0 mb-2 text-gray-400">
            Find me on these social media platforms.
          </h5>
          <div className="mt-6 ">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-3xl shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-3xl shadow-lg font-normal h-10 w-20 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 "
              >
                <FontAwesomeIcon icon={faFacebookSquare} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-3xl shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-3xl shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              >
                <FontAwesomeIcon icon={faGitSquare} />
              </a>
            </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <div className="flex flex-wrap justify-end">
            <div className="w-full lg:w-9/12 px-4">
              <h4 className="text-xl font-semibold mb-2 text-white">
                Thank you for visiting!
              </h4>
              <h5 className="text-lg mt-0 mb-2 text-gray-400">
                Let's get in touch to discuss your next project.
              </h5>
            </div>
          </div>
        </div>
      </div>
        <hr className="my-6 border-gray-800" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full px-4 mx-auto text-center">
            <div className="text-sm text-gray-500 font-semibold py-1">
              © {new Date().getFullYear()}, Made with{" "}
              <i className="fa fa-heart text-red-600"></i> by{" "}
              <a
                href="https://rotshidzwaportfolio.netlify.app/"
                className="text-gray-500 hover:text-white"
              >
                rotshidzwa
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
