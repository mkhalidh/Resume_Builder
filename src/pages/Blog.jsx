import { Link } from "react-router-dom";
import { posts } from "../blog/posts";
import Footer from "../components/Footer";
import { useSEO } from "../hooks/useSEO";

const Blog = () => {
  useSEO({
    title: "Career Blog — Resume & Job-Search Tips | resumebuilder",
    description:
      "Practical, no-nonsense reads on writing, formatting, and presenting your resume — while you build yours for free.",
    path: "/blog",
  });

  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-14">
          <h1 className="font-display font-extrabold text-ink text-3xl md:text-5xl mb-4">
            Career Blog
          </h1>
          <p className="font-body text-ink/60 max-w-lg mx-auto">
            Practical, no-nonsense reads on writing, formatting, and
            presenting your resume — while you build yours.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block bg-white rounded-2xl border border-black/5 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`h-32 bg-gradient-to-br ${post.gradient}`} />
              <div className="p-6">
                <p className="font-body text-ink/40 text-xs uppercase tracking-wide mb-2">
                  {post.readTime}
                </p>
                <h2 className="font-display font-semibold text-ink text-lg mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="font-body text-ink/60 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
