import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Builder from "./pages/Builder";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// React Router doesn't scroll to #hash targets on its own (only Home has
// section ids like #features/#examples), so nav links to them would
// otherwise just land at the top of the page.
const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = hash.slice(1);
    // Give the page a moment to render before measuring its position.
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => clearTimeout(timer);
  }, [hash, pathname]);

  return null;
};

const App = () => {
  return (
    <>
      <ScrollToHash />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </>
  );
};

export default App;
