import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import LiveDashboard from './pages/LiveDashboard';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Transshipment from "./pages/blog/Transshipment";
import TransitHubs from "./pages/blog/TransitHubs";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/live-dashboard" element={<LiveDashboard />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/Transshipment" element={<Transshipment />} />
        <Route path="/blog/transit-hubs" element={<TransitHubs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
