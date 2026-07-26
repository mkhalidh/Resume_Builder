import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { getPost, getRelatedPosts } from "../blog/posts";
import Footer from "../components/Footer";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import { useSEO, SITE_URL } from "../hooks/useSEO";

const AUTHOR_NAME = "Muhammad Khalid Hussain";
const LINKEDIN_URL = "https://www.linkedin.com/in/muhammad-khalid-hussain-384752202/";
const GITHUB_PROFILE_URL = "https://github.com/mkhalidh/";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPost(slug);
  const related = post ? getRelatedPosts(slug) : [];

  useSEO({
    title: post ? `${post.title} | resumebuilder Blog` : undefined,
    description: post?.excerpt,
    path: `/blog/${slug}`,
    jsonLd: post
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.datePublished,
          author: {
            "@type": "Person",
            name: AUTHOR_NAME,
            url: LINKEDIN_URL,
          },
          publisher: { "@type": "Organization", name: "resumebuilder" },
          mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
        }
      : null,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-surface min-h-screen">
      <article className="max-w-2xl mx-auto px-6 py-16 md:py-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-ink/60 hover:text-ink transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <p className="font-body text-ink/40 text-xs uppercase tracking-wide mb-3">
          {post.readTime}
        </p>
        <h1 className="font-display font-extrabold text-ink text-3xl md:text-4xl leading-tight mb-5">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 mb-10">
          <p className="font-body text-ink/50 text-sm">
            Written by <span className="text-ink/70">{AUTHOR_NAME}</span>
          </p>
          <div className="flex items-center gap-2">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Muhammad Khalid Hussain on LinkedIn"
              className="text-ink/40 hover:text-ink transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Muhammad Khalid Hussain on GitHub"
              className="text-ink/40 hover:text-ink transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-8">
          {post.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display font-semibold text-ink text-xl mb-3">
                {section.heading}
              </h2>
              {section.body && (
                <p className="font-body text-ink/70 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              )}
              {section.list && (
                <ul className="mt-3 space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-jade shrink-0 mt-1" />
                      <span className="font-body text-ink/70">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-14 bg-jade-50 rounded-2xl p-8 text-center">
          <p className="font-display font-semibold text-ink text-lg mb-2">
            Ready to put this into practice?
          </p>
          <p className="font-body text-ink/60 text-sm mb-5">
            Build a resume with these ideas in mind — free, no sign-up.
          </p>
          <Link
            to="/templates"
            className="inline-block font-body font-semibold bg-jade text-white px-6 py-3 rounded-full hover:bg-jade/90 transition-colors"
          >
            Start Building
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <h3 className="font-display font-semibold text-ink text-xl mb-6">
            More from the blog
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="flex bg-white rounded-2xl border border-black/5 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`w-28 shrink-0 bg-gradient-to-br ${p.gradient}`} />
                <div className="p-5">
                  <h4 className="font-display font-semibold text-ink mb-1.5 leading-snug">
                    {p.title}
                  </h4>
                  <p className="font-body text-ink/60 text-sm leading-relaxed">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
