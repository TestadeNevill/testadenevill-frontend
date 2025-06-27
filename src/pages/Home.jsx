import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [backgroundMode] = useState('video'); // 'gradient', 'video', 'animation'

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Layers */}
      {backgroundMode === 'video' && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {backgroundMode === 'gradient' && (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-200 via-white to-green-100 z-0" />
      )}

      {backgroundMode === 'animation' && (
        <div className="absolute top-0 left-0 w-full h-full z-0 bg-black text-white flex items-center justify-center">
          [Future Animation Placeholder]
        </div>
      )}

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-screen px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-md mb-6">
          Designing Sustainable Cities of the Future
        </h1>
        <p className="text-lg md:text-xl text-white max-w-2xl mb-8 drop-shadow-sm">
          Hi, I'm Testa DeNevill — I blend urban design, technology, and clean energy to build smarter, greener, and more livable cities.
        </p>
        <Link
          to="/projects"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg font-semibold transition duration-300"
        >
          View My Projects
        </Link>
      </div>
    </section>
  );
};

export default Home;
