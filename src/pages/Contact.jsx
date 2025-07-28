

import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "",  honeypot: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
const apiUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/send"
    : "https://testadenevill.com/send";

const response = await fetch(apiUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});


    const result = await response.json();
    if (result.success) {
      alert("Email sent!");
      setFormData({ name: "", email: "", message: "",  honeypot: "" });
    } else {
      alert("Error sending email.");
    }
  } catch (error) {
    console.error("Contact form error:", error);
    alert("Something went wrong.");
  }
};


  return (
    
    
    <section className="max-w-3xl mx-auto px-6 py-20 text-gray-800">
      <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Send Message
        </button>
        <input
  type="text"
  name="honeypot"
  style={{ display: "none" }}
  value={formData.honeypot || ""}
  onChange={(e) =>
    setFormData({ ...formData, honeypot: e.target.value })
  }
/>

      </form>
    </section>
  );
};

export default Contact;