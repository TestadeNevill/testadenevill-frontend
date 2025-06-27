const About = () => {
  return (
    <section className="min-h-screen bg-white px-4 md:px-10 pt-4 pb-20 max-w-5xl mx-auto text-gray-800 text-lg leading-relaxed space-y-12">

      {/* Section 1: Image Right with Wrapped Text */}
      <div className="relative">
             <h2 className="text-4xl font-bold text-green-800 mb-6 text-center mt-0">About Me</h2>
        <img
          src="/assets/Astronaut.jpg"
          alt="Future Vision"
          className="float-right w-64 h-auto ml-6 mb-4 rounded-lg shadow-md"
        />
        <p>
          <p>
  I've spent much time daydreaming from a bird's-eye view—panning maps, imagining where cities of the future would go, how they would look, and how they would function. 
  Over the years, I've shaped my career around building cities by working in zoning, real estate, site acquisition, and most recently, energy storage.
</p>

<p className="mt-2">
  I'm passionate about designing regenerative and intelligent cities that thrive logistically, socially, and ecologically. 
  From working with zoning and local communities to deploying advanced clean energy systems, I’ve seen firsthand how technology
  and planning must integrate to support long-term resilience. Whether it’s battery storage in urban cores or transforming
  transportation nodes with transit-oriented development, I thrive at the intersection of vision and implementation.
</p>

<div>
  <p className="mt-2">
    I've held impactful roles at companies like NineDot Energy, where I supported the development of distributed battery storage projects across New York City; 
    Smartlink LLC, where I led site acquisition efforts for the NYC Department of Environmental Protection’s rooftop antenna installations to enable remote water meter readings; and Solomon Energy, 
    where I guided clients in reducing energy costs through strategic investments in clean infrastructure.
  </p>

  <p className="mt-2">
    I use my skills in real estate, software development, AI, automation, and city planning to create holistic systems that respond to both local
    needs and global futures. Every project I touch is rooted in clarity, impact, and scale.
  </p>
</div>

<div className="relative clear-both">
  <img
    src="/assets/Testa.jpg"
    alt="On Site"
    className="float-left w-64 h-auto mr-6 mb-4 rounded-lg shadow-md"
  />
  <p>
    My next chapter is focused on building resilient urban systems designed around transshipment—innovative urban planning, data, automation, and sustainable design to create
    efficient, beautiful, and equitable cities. I’m exploring ideas in AI-assisted infrastructure, autonomous rail hubs,
    modular housing, and regenerative transit-oriented development.
  </p>

  <p>
    Ultimately, I’m committed to shaping the infrastructure of the future—where visionary design meets practical execution. 
    By combining data-driven insight with creative problem-solving, I aim to build systems that are not only efficient and forward-thinking, 
    but also grounded in our collective community needs and climate resilience, with long-term value at their core.
  </p>
</div>

        </p>
      </div>
    </section>
  );
};

export default About;
