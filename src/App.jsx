import { Routes, Route } from "react-router-dom";
import SiteHeader from "./components/SiteHeader";
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Builder from "./pages/Builder";

const App = () => {
  return (
    <>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
    </>
  );
};

export default App;
