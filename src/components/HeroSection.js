import React from 'react';

const HeroSection = () => {
  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.query.value;
    window.location.href = `/search?q=${searchQuery}`;
  }

  return (
    <div className="hero-section pt-20 md:pt-36">
      <h1 className="text-4xl md:text-8xl font-bold mb-4">See our concept,<br /> stories & ideas</h1>
      <p className="text-md md:text-xl mb-8">There are many variations of passages of Lorem Ipsum available,<br /> but the majority have suffered alteration in some form.</p>
      <div className="flex flex-col items-center justify-center md:flex-row">
        <form className="search relative" onSubmit={handleSearch}>
          <input
            className="field-input search-input w-input block rounded-lg bg-transparent border text-lg text-black  text-left border-gray-300 shadow-sm placeholder-gray-400 py-2 px-8 md:py-5  md:px-48 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            type="search"
            id="search"
            name="query"
            placeholder="Search..."
            maxLength="256"
            required
          />
          <button
            className="button search-button w-button absolute top-0 right-0 h-full md:px-16 px-8 py-2 text-white bg-gray-800 hover:bg-black rounded-lg"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default HeroSection;
