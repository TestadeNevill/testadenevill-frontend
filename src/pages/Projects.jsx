const projects = [
    {
    title: "Sustainable Cities Portfolio Website",
    description:
      "A full-stack portfolio platform to showcase my work and ideas around sustainable cities. Includes a blog, contact form with email + Google Sheets logging, and modular routing using React.",
    image: "/assets/portfolio-preview.png",
    repo: "https://github.com/TestadeNevill/portfolio-site/tree/main", // Replace or remove
    demo: "/", // "/" if it's this site, or replace with deployed link
    tools: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Nodemailer",
      "Google Sheets API",
    ],
  },
  {
  slug: "live-dashboard",
  title: "Real-Time Urban Data Dashboard",
  date: "June 2025",
  description:
    "A live data dashboard visualizing real-time weather and traffic to help plan responsive urban infrastructure.",
  image: "/assets/livedashboard.png",
  tools: ["React", "OpenWeatherMap API", "Google Maps", "Axios", "Chart.js"],
demo: window.location.hostname === "localhost"
  ? "http://localhost:3000/live-dashboard"
  : "https://testadenevill.com/live-dashboard"
},
 {
    title: "Futuristic Transit Hub",
    description: "A conceptual design integrating eVTOL pads, AI traffic routing, and multi-modal walkability.",
    image: "/assets/Futuristic_Transit_Hub.jpg",
    link: "#",
  },

  
  // {
  //   title: "Battery & Solar Development Project",
  //   description: "A master-planned eco-district integrating renewable energy, green transit, and community agriculture.",
  //   image: "/assets/Smart Green Neighborhood.png",
  //   link: "#",
  // },
  // {
  //   title: "Real Estate Development Proforma",
  //   description: "A master-planned eco-district integrating renewable energy, green transit, and community agriculture.",
  //   image: "/assets/Smart Green Neighborhood.png",
  //   link: "#",
  // },
  // {
  //   title: "SketchUp Model",
  //   description: "A master-planned eco-district integrating renewable energy, green transit, and community agriculture.",
  //   image: "/assets/Smart Green Neighborhood.png",
  //   link: "#",
  // },
  // {
  //   title: "AI Agent for Real Estate Leads",
  //   description: "A master-planned eco-district integrating renewable energy, green transit, and community agriculture.",
  //   image: "/assets/Smart Green Neighborhood.png",
  //   link: "#",
  // },
  // {
  //   title: "Smart Green Neighborhood",
  //   description: "A master-planned eco-district integrating renewable energy, green transit, and community agriculture.",
  //   image: "/assets/Smart Green Neighborhood.png",
  //   link: "#",
  // },
  // {
  //   title: "Solar + Storage Deployment",
  //   description: "Led site acquisition and development of utility-scale solar + battery systems in urban infill zones.",
  //   image: "/assets/Battery_Energy_Storage_BESS.png",
  //   link: "#",
  // },
];

const Projects = () => {
  return (
    <section className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-12">
          My Projects & Experience
        </h2>

        <p className="text-lg font-bold text-green-800 text-center mb-12">
          <a
            href="https://docs.google.com/document/d/1rNiDRXcW0J1CXvAtdBtT_u_tuM-4nc4l/export?format=pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600"
          >
            Resume
          </a>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl transition duration-300"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-3 mt-4">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline text-sm font-medium"
                    >
                      View Code →
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline text-sm font-medium"
                    >
                      Live Demo →
                    </a>
                  )}
                  {project.link && !project.repo && !project.demo && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline text-sm font-medium"
                    >
                      Learn more →
                    </a>
                  )}
                </div>

                {project.tools && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
