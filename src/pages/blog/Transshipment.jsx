import { Link } from "react-router-dom";

const Transshipment = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-gray-800 leading-relaxed">
      <h1 className="text-4xl font-bold text-green-800 mb-4">
        Designing Cities for the Future: The Crucial Role of Transshipment
      </h1>
      <p className="text-sm text-gray-500 mb-10">By Testa DeNevill · June 2025</p>
      <img
        src="/assets/transshipment6.png"
        alt="Transshipment hub"
        className="w-full h-auto object-contain rounded-lg shadow-md mb-10"
      />
   <p className="mb-6">
  In the evolving landscape of urban development, <strong>transshipment</strong> — the process of transferring goods between different modes of transportation at key interchange points — has become a cornerstone of building efficient, sustainable, and resilient cities.
</p>

<p className="mb-6">
  As urban populations grow and the demand for goods and services intensifies, incorporating transshipment hubs into city planning is no longer optional — it's essential. These hubs streamline logistics, reduce traffic congestion, and significantly cut down on carbon emissions by consolidating and optimizing how goods move through dense urban areas.
</p>

<p className="mb-6">
  Acting as vital logistical nodes, transshipment hubs enable the smooth transfer of freight across rail, road, air, and water. They allow cities to manage supply chains more intelligently while adapting to space constraints, regulatory environments, and infrastructure limitations common in urban cores.
</p>

<p className="mb-6">
  By strategically locating these hubs, cities can vastly improve the efficiency of freight distribution, spur local economic growth, and enhance livability. Consider the underutilized underground tunnel systems of the NYC subway — a vast resource primarily used for passengers but capable of so much more. Imagine leveraging this network to move not only people but also freight, waste, and utilities. The streets could be cleared of overflowing trash, commercial trucks could be reduced or rerouted, and valuable street space could be repurposed for pedestrians, greenery, or parking. The ability to move people and goods swiftly and sustainably is foundational to any modern city — and <strong>transshipment</strong> is the key to unlocking that future.
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

export default Transshipment;
