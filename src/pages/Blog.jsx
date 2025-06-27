import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";

const Blog = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 text-gray-800">
      <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">Blog</h1>
      <div className="grid gap-10">
        {blogPosts.map((post) => (
          <div key={post.slug} className="border-b pb-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-green-700">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <p className="mb-4">{post.excerpt}</p>
            <Link
              to={post.link}
              className="text-green-600 hover:underline font-medium"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;