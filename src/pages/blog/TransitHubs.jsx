import { Link } from "react-router-dom";

const TransitHubs = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold text-green-800 mb-4">
        Reimagining Transit Hubs: The Future of Connected Cities
      </h1>
      <p className="text-sm text-gray-500 mb-10">By Testa DeNevill · June 2025</p>
      <img
        src="/assets/transithub4.png"
        alt="Transit hub"
        className="w-full h-auto object-contain rounded-lg shadow-md mb-10"
      />
  <p className="mb-6">
  Transportation touches nearly every aspect of our daily lives. Whether walking from your front door to your car, catching a train to the office, or biking to meet friends, we rely on an intricate web of mobility options. It's imperative that our cities reflect this reality through intentional design, integrated systems, and efficient infrastructure.
  In a future where urban areas are more interconnected than ever, transit hubs will serve as the vital nerve centers — improving accessibility, reducing congestion, and enabling equitable movement for all.
</p>

<p className="mb-6">
  Historically, major transit hubs revolved around buses and trains. But the future demands more. These nodes must evolve to include every mode of transportation — from micromobility like scooters and bikes to high-speed rail and Electric Vertical Take-Off and Landing (eVTOL) aircraft. These aircraft, requiring minimal space to operate, offer rapid point-to-point air travel directly into urban centers. Meanwhile, integrating maritime shipping links transforms these hubs into logistics gateways, enabling faster and smarter movement of goods in and out of the city.
  As such, they become not just transit points but dynamic zones of social exchange, economic activity, and digital infrastructure.
</p>

<p className="mb-6">
  Rethinking transit hub design with sustainability, adaptability, and community integration in mind will allow cities to support dense, mixed-use development while strengthening regional connectivity. 
  By pushing the boundaries of architecture and systems engineering, we can reshape these spaces into high-performance ecosystems that streamline the flow of people, goods, and data. These models won’t just serve local needs — they’ll act as blueprints for future-forward cities worldwide.
</p>

<p className="mb-6">
  Tomorrow’s transit hub is more than infrastructure — it's a living ecosystem, essential to the functionality, equity, and vibrancy of the smart, green city.
</p>

      <Link
        to="/blog"
        className="text-green-600 hover:underline text-sm mt-8 block"
      >
        ← Back to Blog
      </Link>
    </section>
  );
};

export default TransitHubs;